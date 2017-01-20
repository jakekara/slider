/** slider.js 
 * A library for generating slideshows.
 * jake kara
 * jake@jakekara.com
 */

var slider = function(div){
    this.current_slide = -1;
    this.slides = [];
    this.div = div;
    return this;
}

slider.prototype.initiate = function(){
    d3.select(this.div).html("");
    this.easel = d3.select(this.div).append("div")
	.style("height","100%");

    this.top_bar_div = this.easel.append("div")
	.classed("top_bar", true)
    this.top_bar_div.append("div")
    	.classed("logo", true)
    	.append("img")
    	.attr("src","img/TREND_LOGO.png")
    
    this.slide_div = this.easel.append("div")
	.classed("slide", true);
    this.graphic_div = this.slide_div.append("div")
    	.classed("graphic", true);
    this.copy_div = this.slide_div.append("div")
	.classed("copy", true);
    this.easel.append("div")
	.classed("clear_both", true);
    this.control_area = this.easel.append("div")
	.classed("control_area", true);
    this.progress_bar = this.easel.append("div")
	.classed("progress_bar", true)

    return this;
}

slider.slide = function(contents){
    this.copy = contents.copy;
    this.graphic = contents.graphic;
    this.background_color = contents.background_color || "gainsboro";
    this.f = contents.f || null;
    return this;
}

// slider.slide.prototype.render = function(){

//     if (this.f != null){
// 	this.f();
//     }

//     var detached = new ch.core.detached();

//     detached.d3selection.classed("slide", true)
// 	.style("background-color", this.background_color);

//     if (this.graphic != false){
// 	var graphic_area = detached.d3selection
// 	    .append("div")
// 	    .classed("graphic", true)
// 	    .html(this.graphic);
//     }

//     var text_area = detached.d3selection.append("div")
// 	.classed("copy", true)
// 	.html(this.copy);

//     detached.d3selection.append("div")
// 	.classed("clear_both", true);

//     return detached;
// }

slider.prototype.set_up_touch = function(){
    var that = this;
    var handleStart = function(e){
	var touchobj = e.changedTouches[0];
	that.startX = touchobj.pageX;
	that.startY = touchobj.pageY;
    };
    var handleMove = function(e){
    };
    var handleEnd = function(e){
	var touchobj = e.changedTouches[0];
	endX = touchobj.pageX;
	endY = touchobj.pageY;
	if (endY > that.startY){
	    that.next();
	}
	else if (endY < that.startY){
	    that.prev();
	}
	that.startX = null;
	that.startY = null;
    };
    
    d3.select(window).node().addEventListener("touchstart", handleStart);
    d3.select(window).node().addEventListener("touchmove", handleMove);
    d3.select(window).node().addEventListener("touchend", handleEnd);

    that.lock = false;

    var handleScroll = function(e){
	clearTimeout(that.throttle_wheel);
	if (that.lock == false){
	    if (e.deltaY < 0) {
		that.prev();
	    }
	    else {
		that.next();
	    }
	}
	that.lock = true;
	that.throttle_wheel = setTimeout(function(){
	    that.lock = false;
	}, 50);
    }
    
    // d3.select(window).node().addEventListener("mousewheel", handleScroll);
}

slider.prototype.add_bar = function(){
    this.progress_bar.style(width, this.percent() + "%");
}

slider.prototype.add_controls = function(){
    var that = this;
    this.control_area.html("");
    var next_button = this.control_area.append("div")
    // .classed("nav_button_wrapper", true)
    // .append("div")
	.classed("nav_button", true)
	.classed("disabled", true)
	.text("Next")

    if (this.current_slide < this.slides.length - 1){
	next_button.classed("disabled", false)
	    .on("click", function(){
	    that.next.call(that);
	});

    }

    that = this;
    var prev_button = this.control_area.append("div")
	.classed("nav_button", true)
	.classed("disabled", true)
	.text("Previous")
	.on("click", function(){
	    that.prev.call(that);
	});

    
    if (this.current_slide > 0) {
	prev_button.classed("disabled", true)
	    .classed("disabled", false)
	    .on("click", function(){
		that.prev.call(that);
	    });

    }

    this.control_area.append("div").classed("clear_both", true);
    
}

slider.prototype.percent = function(offset){
    var offset = offset || 0;
    return ((this.current_slide + 1 + offset) / this.slides.length) * 100;
}

slider.prototype.render = function(updown){

    var slide = this.slides[this.current_slide];
    this.copy_div.html(slide.copy);
    this.easel.style("background-color", slide.background_color);
    slide.graphic(this.graphic_div);
    // this.slides[this.current_slide].render().attach(this.easel.node());
    
    if (updown == "up"){
	d3.selectAll(".copy").style("margin-top","200px");
    } else {
	d3.selectAll(".copy").style("margin-top","-200px");
    }
    
    d3.selectAll(".copy").transition().style("margin-top","0px").duration(300);
    
    // var that = this;

    // this.progress_bar
    // 	.style("width", function(){
    // 	    if (updown == "down"){
    // 		return that.percent(-1) + "%";
    // 	    }
    // 	    else {
    // 		return that.percent(1) + "%";
    // 	    }
    // 	})

    var bgcolor=this.slides[this.current_slide].background_color;
    
    d3.selectAll(".progress_bar")
	.transition()
	.style("width",this.percent() + "%")
    
    this.add_controls();
    this.set_up_touch();
}

slider.prototype.add = function(s){
    if (! s instanceof slider.slide) {
	console.error("slider.add(s): s must be instance of slider.slide");
	return;
    }

    this.slides.push(s);

    return this;
}

slider.prototype.has_next = function(){
    return this.slides.length > this.current_slide + 1;
}

slider.prototype.has_prev = function(){
    return this.current_slide > 0;
}

slider.prototype.next = function(){
    if (!this.has_next()) return;

    var that = this;
    clearTimeout(this.next_throttle);
    this.next_throttle = setTimeout(function(){
	that.current_slide ++;
	that.render("down");
    }, 500);
}

slider.prototype.prev = function(){
    if(!this.has_prev()) return;

    var that = this;
    clearTimeout(this.prev_throttle);
    this.prev_throttle = setTimeout(function(){
	that.current_slide --;
	that.render("up");
    }, 500);
}
