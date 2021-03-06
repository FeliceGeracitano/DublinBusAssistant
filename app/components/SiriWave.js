export default `

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

	<style>
* {
-webkit-user-select: none;
}
html 
body {
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 100;
  background: #000000;
  text-align: center;
}
h1, h2, h3 {
  font-weight: 100;
}

.container {
  flex: 1
}
.container  canvas{
  height: 100px
}
	</style>
	<body>


		<div>
			<div id="container-ios9" class="container">
			</div>
		</div>

		<script>
function SiriWave9Curve(a){a=a||{},this.controller=a.controller,this.color=a.color,this.tick=0,this.respawn()}function SiriWave9(a){a=a||{},this.tick=0,this.run=!1,this.ratio=a.ratio||window.devicePixelRatio||1,this.width=this.ratio*(a.width||320),this.height=this.ratio*(a.height||100),this.MAX=this.height/2,this.speed=.1,this.amplitude=a.amplitude||1,this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width=this.width/this.ratio+"px",this.canvas.style.height=this.height/this.ratio+"px",this.container=a.container||document.body,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.curves=[];for(var b=0;b<SiriWave9.prototype.COLORS.length;b++)for(var c=SiriWave9.prototype.COLORS[b],d=0;d<3*Math.random()|0;d++)this.curves.push(new SiriWave9Curve({controller:this,color:c}));a.autostart&&this.start()}SiriWave9Curve.prototype.respawn=function(){this.amplitude=.3+.7*Math.random(),this.seed=Math.random(),this.open_class=2+3*Math.random()|0},SiriWave9Curve.prototype.equation=function(a){var b=this.tick,c=-1*Math.abs(Math.sin(b))*this.controller.amplitude*this.amplitude*this.controller.MAX*Math.pow(1/(1+Math.pow(this.open_class*a,2)),2);return Math.abs(c)<.001&&this.respawn(),c},SiriWave9Curve.prototype._draw=function(a){this.tick+=this.controller.speed*(1-.5*Math.sin(this.seed*Math.PI));var b=this.controller.ctx;b.beginPath();for(var e,f,g,c=this.controller.width/2+(-this.controller.width/4+this.seed*(this.controller.width/2)),d=this.controller.height/2,h=-3;h<=3;)e=c+h*this.controller.width/4,f=d+a*this.equation(h),g=g||e,b.lineTo(e,f),h+=.01;var i=Math.abs(this.equation(0)),j=b.createRadialGradient(c,d,1.15*i,c,d,.3*i);j.addColorStop(0,"rgba("+this.color.join(",")+",0.4)"),j.addColorStop(1,"rgba("+this.color.join(",")+",0.2)"),b.fillStyle=j,b.lineTo(g,d),b.closePath(),b.fill()},SiriWave9Curve.prototype.draw=function(){this._draw(-1),this._draw(1)},SiriWave9.prototype._clear=function(){this.ctx.globalCompositeOperation="destination-out",this.ctx.fillRect(0,0,this.width,this.height),this.ctx.globalCompositeOperation="lighter"},SiriWave9.prototype._draw=function(){if(this.run!==!1){this._clear();for(var a=0,b=this.curves.length;a<b;a++)this.curves[a].draw();requestAnimationFrame(this._draw.bind(this))}},SiriWave9.prototype.start=function(){this.tick=0,this.run=!0,this._draw()},SiriWave9.prototype.stop=function(){this.tick=0,this.run=!1},SiriWave9.prototype.COLORS=[[32,133,252],[94,252,169],[253,71,103]];var $siri_ios9=document.getElementById("container-ios9"),SW9=new SiriWave9({width:259,height:40,speed:.2,amplitude:1,container:$siri_ios9,autostart:!0});

SW9.MAX = 40;
document.addEventListener('message', function(e) {
 SW9.MAX = (e.data === 'start') ? 40 : 0.01;
});
</script>
</body>
</html>`
