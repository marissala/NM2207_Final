// FINAL ASSIGNMENT! //

// IDEA outline:
// 1. Show text about mind trees
// 2. 3 drawn images of different forests
//      back and forward buttons + a text that works together?
// 3. Finally a canvas to draw own mind forest
//      can change colors
//      patterns for birch trees?
//      bushes
//      flowers on the tips
// 4. Share on social media

// -------------------------------------------------------------//
// --- Here we go --- //
// ------------------------------------------------------------- //
// starting codes

var tree = {

    canvas:     '',
    ctx:        '',
    height:     0,
    width:      0,
    spread:     0.6,
    drawLeaves: true,
    leavesColor:'',
    leaveType:  this.MEDIUM_LEAVES,
    
    MAX_BRANCH_WIDTH:   20,
    SMALL_LEAVES:       10,
    MEDIUM_LEAVES:      200,
    BIG_LEAVES:         500,
    THIN_LEAVES:        900,
    
    /**
     * @member draw
     * tree.draw() initializes tthe tree structure
     *
     * @param {object} ctx      the canvas context
     * @param {integer} h       height of the canvas
     * @param {integer} w       width of the canvas
     * @param {float} spread    how much the tree branches are spread
     *                          Ranges from 0.3 - 1.
     * @param {boolean} leaves  draw leaves if set to true    
     *
     */
    draw : function(ctx, h, w, spread, leaves, leaveType) {
        // Set how much the tree branches are spread
        if(spread >= 0.3 && spread <= 1) {
            this.spread = spread;
        } else {
            this.spread = 0.6;
        }
        
        if(leaves === true || leaves === false) {
            this.drawLeaves = leaves;
        } else {
            this.leaves = true;
        }
        
        if(leaveType == this.SMALL_LEAVES || 
           leaveType == this.MEDIUM_LEAVES || 
           leaveType == this.BIG_LEAVES || 
           leaveType == this.THIN_LEAVES) {
            this.leaveType = leaveType;
        } else {
            this.leaveType = this.MEDIUM_LEAVES;
        }
        
        this.ctx = ctx;
        this.height = h;
        this.width = w;
        this.ctx.clearRect(0,0,this.width,this.height);
        // Center the tree in the window
        this.ctx.translate(this.width/2,this.height);
        // Set the leaves to a random color
        this.leavesColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        // Set branch thickness
        this.ctx.lineWidth = 1 + (Math.random() * this.MAX_BRANCH_WIDTH);
        this.ctx.lineJoin = 'round';
        
        this.branch(0);
    },
    
    /**
     * @member branch
     * tree.branch() main tree drawing function
     *
     * @param {String} depth the maimum depth the tree can branch,
     *        Keep this value near 12, larger value take linger to render.
     *
     */
    branch : function(depth) {
        if (depth < 12) 
        {
            this.ctx.beginPath();
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(0,-(this.height)/10);

            this.ctx.stroke();
            
            this.ctx.translate(0,-this.height/10);
            // Random integer from -0.1 to 0.1
            var randomN = -(Math.random() * 0.1) + 0.1;

            this.ctx.rotate(randomN); 

            if ((Math.random() * 1) < this.spread)
            {
                // Draw the left branches
                this.ctx.rotate(-0.35);
                this.ctx.scale(0.7,0.7);
                this.ctx.save();
                this.branch(depth + 1);
                // Draw the right branches
                this.ctx.restore();  
                this.ctx.rotate(0.6);
                this.ctx.save();
                this.branch(depth + 1);   
                this.ctx.restore();        
            }
            else 
            { 
                this.branch(depth);
            }

        }
        else
        {   
            // Now that we have done drawing branches, draw the leaves
            if(this.drawLeaves) {
                var lengthFactor = 200;
                if(this.leaveType === this.THIN_LEAVES) {
                    lengthFactor = 10;
                }
                this.ctx.fillStyle = this.leavesColor;
                this.ctx.fillRect(0, 0, this.leaveType, lengthFactor);
                this.ctx.stroke();
            }
        }
    }
};



define(
    [],
    function () {

        // ------------------------------------------------------------- //
        // Display text about forests 
        // ------------------------------------------------------------- //


        // ------------------------------------------------------------- //
        // Draw the images of the 3 different forests
        // ------------------------------------------------------------- //

        // we get the canvas first!
        var svgdiv = document.getElementById("svgcanvas");
        //idk raphael papers etc
        var paper = new Raphael(svgcanvas);

        // CLEAN AND CLEAR

        // MESSY AND 2-LAYERED

        // MESSY AND CLEAR

        // Back and forward buttons added

        // ------------------------------------------------------------- //
        // Add the texts to the forests, too
        // ------------------------------------------------------------- //


        // ------------------------------------------------------------- //
        // Add the canvas to draw own forest
        // ------------------------------------------------------------- //
        
        var iosocket = io.connect();
        //var uname = prompt("Please enter your name");
        //var uname = uname || "noname";
    
        // get the colors in and the stroke width
        var H = document.getElementById("H");
        var S = document.getElementById("S");
        var L = document.getElementById("L");
        var StrokeWidth = document.getElementById("StrokeWidth");
    
        iosocket.on('connect', function () {
            console.log("Yo.........connected!");
    
            // MESSAGE PROCESSING HERE --------------
            iosocket.on("message", function(m){
                //m.data has information about if the received information piece is a drawing or text, and processes it accordingly
                console.log("Got a message!" + m.data);
                //chatBox.value+= m.uname + ": " + m.data + "\n";
    
                //because we have either text or draw input coming in, i make an if statement to process the input differently
                if (m.mtype == "chat") {
                    //if we get text input then we wanna show it in the chatbox, add it to the previous messages with += and we also wanna end with a linebreak so the messages don't pile up
                    //chatBox.value+= m.uname + ": " + m.data + "\n";
                    console.log("What's this? Text data?! That can't be right");
                } else if (m.mtype == "draw") {
                    console.log("mtype is: " + m.data);
                    //svgdiv = m.data;
    
                    //uhm this is weirder
                    //we have draw data now so I think we draw the paper again with the input that we got
                    raphaelPath = paper.path(m.data);
                    //and the attributes of the added path get updated with the attributes that were used by the user
                    raphaelPath.attr({"path":m.data,
                                    "stroke":m.stroke,
                                    "stroke-width":m.strokewidth});
                    console.log("stroke " + m.stroke);
                }
                
    
            })
    
            //---------------------------------------
            
            //I guess this shows up when the other person leaves?
            iosocket.on('disconnect', function() {
                console.log("Disconnected")
            });
        });
        
        // we get the canvas first!
        var svgdiv = document.getElementById("svgcanvas");
        //idk raphael papers etc
        var paper = new Raphael(svgcanvas);
    
        var raphaelPath; // for holding the raphael path
        var pathString; // for holding the path string
        var mousePushed=false; // for remembering the state of the mouse.
    
        //the path of a drawing consists of pushing the mouse down, holding it down while drawing, and the line is drawn when you lift the mouse up
        //we send as input to the server only the complete line that's drawn
        //(i guess if you'd also send it while the drawing is happening, you could draw in real-time)
        svgdiv.addEventListener("mousedown", function(ev){
            //this creates the svg initial line/path thingy based on position of the mouse on canvas
            pathString = "M" + ev.offsetX + "," + ev.offsetY;
            var colorString = "hsl(" + H.value + "," + S.value + "," + L.value + ")";
            raphaelPath = paper.path(pathString); //drawing the path on the paper
            raphaelPath.attr({"path":pathString,
                            "stroke":colorString,
                        "stroke-width":StrokeWidth.value});
            // here we change the mousePushed to true because it's true ;)
            mousePushed = true;
    
        });
    
        //continuing the line and sending it to the server
        svgdiv.addEventListener("mouseup", function(ev){
            //L meant "line to" from the initial point, we do the same as we did in the last one
            //oh and svg is case-sensitive!
            pathString += " L" + ev.offsetX + "," + ev.offsetY;
            var colorString = "hsl(" + H.value + "," + S.value + "," + L.value + ")";
            raphaelPath.attr({"path":pathString,
                                "stroke":colorString,
                                "stroke-width":StrokeWidth.value});
            mousePushed = false;
            //console.log(pathString);
    
            // path is complete here
            console.log("stroke" + StrokeWidth);
            
            iosocket.send({"uname": uname,"data":pathString, "mtype":"draw", "stroke":colorString, "strokewidth":StrokeWidth.value});
        });
    
        // i guess this one is for when the mouse is moving and is also pushed, makes sure we draw a line
        svgdiv.addEventListener("mousemove", function(ev){
            if (mousePushed == true) {
                pathString += " L" + ev.offsetX + "," + ev.offsetY;
                raphaelPath.attr({"path":pathString});
                //console.log("path: " + raphaelPath.path);
            }
        });
    
        //clearing up the canvas with the Clear button
        var Clear = document.getElementById("clear");
        Clear.addEventListener("click", function(){
            paper.clear();
        })
        // Choose among backgrounds

        // Add tree types to be drawn, brushes basically

        // Add color changing function

        // Brush size

        // Add flowers

        // Add bushes

        // ------------------------------------------------------------- //
        // Share on social media
        // ------------------------------------------------------------- //

        console.log("HEllo world");
    
        
    
        
    
    });


