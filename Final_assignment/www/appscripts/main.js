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





define(
    [],
    function () {

        // ------------------------------------------------------------- //
        // Starting off with the base codes for tree attributes 
        // ------------------------------------------------------------- //

        // did not change this code, it specifies the original tree features that get drawn as the webpage opens/is refreshed
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
            

            // this is some strange code ive never seen before
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

             // they use a colon for writing this function!
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
                // Set the leaves to a random color (it's pretty cool)
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
            
                        // canvas height and width values
                        var height = 450;
                        var width = 800;
                        
                        //var canvas1 = document.getElementById("canvas1");
                        //var canvas2 = document.getElementById("canvas2");
            
                        m = 5; //canvas number
            
                        // create lists for each element that is necessary for the init() and draw() functions
                        // do this by firstly naming the containers and all elements with the same name and add numbers 0 to max nr of canvases
                        // --> start from 0 because running a for loop from 0 is easier than doing that from 1, also because lists start counting from 0 and not 1 so it's good for both reasons, makes it easier
                        // for loop loops over from element with id 0 until max number of canvases, easy
                        var canvases = [];
                        for( var i = 0; i < m; i++ ) {
                            canvases[i] = document.getElementById("canvas" + i);
                        }
                        var redraws = [];
                        for( var i = 0; i < m; i++ ) {
                            redraws[i] = document.getElementById("redraw" + i);
                        }
                        var clears = [];
                        for( var i = 0; i < m; i++ ) {
                            clears[i] = document.getElementById("clear" + i);
                        }
                        
                        var noLeavesS = [];
                        for( var i = 0; i < m; i++ ) {
                            noLeavesS[i] = document.getElementById("noLeaves" + i);
                        }
                        var leaveTypes = [];
                        for( var i = 0; i < m; i++ ) {
                            leaveTypes[i] = document.getElementById("leaveType" + i);
                        }
                        /*var autos = [];
                        for( var i = 0; i < m; i++ ) {
                            autos[i] = document.getElementById("auto" + i);
                        }*/
            
                        var spreads = [];
                        for( var i = 0; i < m; i++ ) {
                            spreads[i] = document.getElementById("spread" + i);
                        }
            
            
            
                        //var canvases = [canvas1, canvas2]; 
            
                            //start of the function
                            //I changed the original elements (which were based on getElementById) to be Input
                            //I changed the function to take Input as a parameter that includes all the needed values
                            function init(Input) {
                                //var canvas = canvases[i];
                                
                                if(Input.canvas.getContext("2d")) {
                            
                                    // here is the code that reacts to the redraw button
                                Input.redraw.onclick = function() {
                                    // here i need a new context based on the Input because I don't include this in the Input itself and the default one is a global variable
                                    ctx = Input.canvas.getContext("2d");
                                    //draw tree!
                                    drawTree(Input);
                                } 
            
                                // function i wrote to have an option to clear the canvas by a button press
                                Input.clear.onclick = function() {
                                    Input.canvas.getContext("2d").clearRect(0, 0, Input.canvas.width, Input.canvas.height);
                                }
                                
                                
                                // this piece makes sure leaves are on/off based on if the box is checked for leaves
                                Input.noLeaves.onclick = function () {
                                    // this is saying that disable leaveType if the box is unchecked, otherwise leaveType can do its own thing
                                 Input.leaveType.disabled = !Input.noLeaves.checked;
                                };
            
                                //code i removed
                                /*Input.auto.onclick = function () {
                                    if (Input.auto.checked) {
                                        auto = Input.auto;
                                        Input.intervalId = setInterval(() => drawTree(Input), 1000);
                                    } else {
                                        clearInterval(Input.intervalId);
                                    }
                                }*/
            /*
                                Input.noLeaves.onclick = function() {
                                    if(this.checked == false)
                                        Input.leaveType.disabled = true;
                                    else
                                        Input.leaveType.disabled = false;
                                }
                                
                                Input.auto.onclick = function() {
                                    if(this.checked == false)
                                        clearInterval(intervalId);
                                    else
                                        ctx = Input.canvas.getContext("2d");
                                        intervalId = setInterval ("drawTree(Input)", 1000);
                                }*/
                                
                                // this part here just draws the original trees with original features
                                Input.canvas.height = height;
                                Input.canvas.width = width;
                                ctx = Input.canvas.getContext("2d");
                                drawTree(Input);
                                
                                } else {
                                    //eh, nice piece of code I guess but I'll go for errors instead of this nice sentence
                                    document.getElementById('form_container').innerHTML = "Your browser doen't support Canvas!";
                                }
                            };
                        
                            //drawing function - also not mine but i modified it
                            function drawTree(Input) {
                                //ctx = Input.canvas.getContext("2d");
                                var drawLeaves = Input.noLeaves.checked;
                                var treeSpread = Input.spread.value;
                                var temp  = Input.leaveType.value;
                                var leaveType = '';
                                
                                //this here is a pretty cool way to figure out what kind of leaves to draw on the tree
                                switch(temp) {
                                    case '1': leaveType = tree.SMALL_LEAVES;
                                            break;
                                    case '2': leaveType = tree.MEDIUM_LEAVES;
                                            break;
                                    case '3': leaveType = tree.BIG_LEAVES;
                                            break;
                                    case '4': leaveType = tree.THIN_LEAVES;
                                            break;
                                    default:leaveType = tree.MEDIUM_LEAVES;
                                }
            
                                ctx.save();
                                tree.draw(ctx,height/1.05,width,treeSpread,drawLeaves,leaveType); // dividing by 1.05 to position trees higher than canvas edge
                                ctx.restore();
                        }
                    
                        //the for loop I added
                        // it loops over all of my canvases and creates an Input array thing for each canvas
                        // those inputs are individually fed to the init() function
                        for (var i = 0; i < canvases.length; i++) {
                            
                            //Creating the input Input for the function, this should have all attributes that are needed to be retrieved via getelementbyid
                            var Input = {canvas:canvases[i], 
                            redraw: redraws[i], 
                            clear: clears[i],
                            noLeaves:noLeavesS[i],
                            leaveType:leaveTypes[i],
                            /*auto:autos[i],*/
                            spread:spreads[i]};
            
                            init(Input);
            
                        }


        console.log("HEllo world");
    
    });


