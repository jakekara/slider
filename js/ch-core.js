var ch = ch || {};

ch.core = {};

// -----------------------------------------------
// accessor - gettable and setable
// -----------------------------------------------
ch.core.Accessor = function(def_val){
    if (typeof(def_val) != "undefined"){
	this.val = def_val;
	return this;
    }
    this.val = null;
}

ch.core.Accessor.prototype.get = function(){
    return this.val;
}

ch.core.Accessor.prototype.set = function(val){
    this.val = val;
    return this;
}

ch.core.Accessor.prototype.toString = function(){
    return "<ch.core.accessor: " + this.val + ">";
}

// -----------------------------------------------
// d3 selection detatched element
// -----------------------------------------------

ch.core.detached = function(el){
    var el = el || "div";
    this.d3selection = d3.select(document.createElement(el));
    return this;
}

ch.core.detached.prototype.attach = function(parent){
    d3.select(parent).node().appendChild(this.d3selection.node());
}
