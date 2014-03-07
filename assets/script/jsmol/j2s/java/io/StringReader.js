$_L(["java.io.Reader"],"java.io.StringReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException",null],function(){
c$=$_C(function(){
this.str=null;
this.markpos=-1;
this.pos=0;
this.count=0;
$_Z(this,arguments);
},java.io,"StringReader",java.io.Reader);
$_K(c$,
function(str){
$_R(this,java.io.StringReader,[str]);
this.str=str;
this.count=str.length;
},"~S");
$_V(c$,"close",
function(){
{
if(this.isOpen()){
this.str=null;
}}});
$_M(c$,"isOpen",
($fz=function(){
return this.str!=null;
},$fz.isPrivate=true,$fz));
$_V(c$,"mark",
function(readLimit){
if(readLimit>=0){
{
if(this.isOpen()){
this.markpos=this.pos;
}else{
throw new java.io.IOException(("K0083"));
}}}else{
throw new IllegalArgumentException();
}},"~N");
$_V(c$,"markSupported",
function(){
return true;
});
$_M(c$,"read",
function(){
{
if(this.isOpen()){
if(this.pos!=this.count){
return this.str.charAt(this.pos++);
}return-1;
}throw new java.io.IOException(("K0083"));
}});
$_M(c$,"read",
function(buf,offset,len){
if(0<=offset&&offset<=buf.length&&0<=len&&len<=buf.length-offset){
{
if(this.isOpen()){
if(this.pos==this.count){
return-1;
}var end=this.pos+len>this.count?this.count:this.pos+len;
this.str.getChars(this.pos,end,buf,offset);
var read=end-this.pos;
this.pos=end;
return read;
}throw new java.io.IOException(("K0083"));
}}throw new ArrayIndexOutOfBoundsException();
},"~A,~N,~N");
$_V(c$,"ready",
function(){
{
if(this.isOpen()){
return true;
}throw new java.io.IOException(("K0083"));
}});
$_V(c$,"reset",
function(){
{
if(this.isOpen()){
this.pos=this.markpos!=-1?this.markpos:0;
}else{
throw new java.io.IOException(("K0083"));
}}});
$_V(c$,"skip",
function(ns){
{
if(this.isOpen()){
if(ns<=0){
return 0;
}var skipped=0;
if(ns<this.count-this.pos){
this.pos=this.pos+ns;
skipped=ns;
}else{
skipped=this.count-this.pos;
this.pos=this.count;
}return skipped;
}throw new java.io.IOException(("K0083"));
}},"~N");
});
