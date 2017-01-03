var s = (function(){
    var s = new slider("#slide_page");

    s.add(new slider.slide({
	copy: "Hello",
	graphic: function(d3selection) {
	    d3selection.html("<img src='https://placebear.com/g/200/300'>")
	    // $(d3selection.node()).hide();
	    // $(d3selection.node()).fadeIn();
	},
	background_color: "tomato"
    }));

    s.add(new slider.slide({
	copy: "Hello again from slide 2",
	graphic: function(d3selection){
	    d3selection.html("<img src='https://placebear.com/g/400/500'>");
	    // $(d3selection.node()).hide();
	    // $(d3selection.node()).fadeIn();
	},
	background_color: "goldenrod"
    }));
    s.add(new slider.slide({
	copy: "OK, this is slide 3",
	graphic: function(d3selection){
	    d3selection.html("<img src='https://placebear.com/g/200/200'>");
	    // $(d3selection.node()).hide();
	    // $(d3selection.node()).fadeIn();
	},
	background_color: "magenta"
    }));

    s.add(new slider.slide({
	copy: "Slide 4 time",
	graphic: function(d3selection){
	    d3selection.html("<img src='https://placebear.com/g/500/500'>")
	    // $(d3selection.node()).hide();
	    // $(d3selection.node()).fadeIn();
	},
	background_color: "lightskyblue"
    }));
    s.add(new slider.slide({
	copy: "Here's slide 5",
	graphic: function(d3selection){
	    d3selection.html("<img src='https://placebear.com/g/340/340'>");
	    // $(d3selection.node()).hide();
	    // $(d3selection.node()).fadeIn();
	},
	background_color: "lightgreen"
    }));

    s.add(new slider.slide({
	copy: "You guessed it. This is six.",
	graphic: function(d3selection){
	    d3selection.html("");
	    alert("Fin.");
	},
	background_color: "orange",
    }));

    s.initiate();
    s.next();
    return s;

})();
