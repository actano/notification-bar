module.exports = function(jade) { return function template(locals) {
var jade_debug = [ new jade.DebugItem( 1, undefined ) ];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (maxWidth, message) {
jade_debug.unshift(new jade.DebugItem( 0, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 1, jade_debug[0].filename ));
buf.push("<div id=\"notification-bar\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
buf.push("<div" + (jade.attr("style", maxWidth ? "max-width:" + (maxWidth) + "" : "", true, false)) + " class=\"container\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 3, jade_debug[0].filename ));
buf.push("<div class=\"message\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 4, jade_debug[0].filename ));
buf.push("<span class=\"accept\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
buf.push("<i class=\"fa fa-times\">");
jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
jade_debug.shift();
buf.push("</i>");
jade_debug.shift();
jade_debug.shift();
buf.push("</span>");
jade_debug.shift();
jade_debug.unshift(new jade.DebugItem( 6, jade_debug[0].filename ));
buf.push(null == (jade_interp = message) ? "" : jade_interp);
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.shift();}.call(this,"maxWidth" in locals_for_with?locals_for_with.maxWidth:typeof maxWidth!=="undefined"?maxWidth:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "#notification-bar\n    .container(style = maxWidth ? \"max-width:#{maxWidth}\" : \"\")\n        .message\n            span.accept\n                i.fa.fa-times\n            != message\n");
}
} }