<?php 
$title="Our Countdown Clock";
$subTitle="The Countdown Clock";
include "intro.phtml" ?>


<center>
<?php Christmas_years(); ?>
</center>
<h1>The Clock</h1>

<div class="row">
   <div class="col-sm-4 order-sm-2">
      <figure class="youtubeVideo"> 
         <a href="https://www.youtube.com/watch?v=z0MqBhNhmZU">
            <img src="https://img.youtube.com/vi/z0MqBhNhmZU/0.jpg" class="img-fluid" 
                 style="border-style:none; margin: 5px 5px 5px 5px;">
            <figcaption>Video: Current version</figcaption>
         </a>
      </figure>
   </div><!--sm-4-->
   <div class="col-sm-8 order-sm-1">

Introduced in 2002, the clock is one of the oldest elements in our display having been rebuilt a few times since the original design. The current design contains two small grids of RGB pixels that are controlled by <a href="DMX.phtml">E1.31</a> Controllers.  A <a href="https://github.com/ghormann/GregsLights">custom Linux program</a> controls the clock and underling grid updating the color of each pixel up to 20 times per second.
<br><br>
<h2>History</h2>
Originally the clock was made of standard incandescent mini-lights that were popular at the time (<a href="https://www.youtube.com/watch?v=MnXRQG9p0ps">Video</a>).  We used 49 strands that were 20 bulbs per strand (<a href="/new/christmas/2002/clock_back2.JPG">picture</a>). Each digit was configured like a 7-segment led display and turned on/off by a <a href="christmas/2001/boxes/ssrs.jpg">solid state relay</a> connected to the <a href="parallel320.phtml">Hill 320 Parallel Port controller</a>. This resulted in seven CAT-5 wires caring control signal from the basement to the clock, with all the relays just behind the clock. In the original design, the words "Seconds until Christmas" were spelled out in 100 count mini-lights.  These lights were always on.

</p>
<p>
in 2014, we replaced the static "Seconds until Christmas" with our first RGB <a href="DMX.phtml">pixel grid</a> that scrolled messages and had simple annotation (<a href="https://www.youtube.com/watch?v=tCQ9uxtrXfQ">Video</a>). This pixel grid was originally just 48 pixels wide but expanded to 96 pixels wide the following year (<a href="https://www.youtube.com/watch?v=UdQGn5WxL0I">Video</a>). The pixels are held in place by two layers of hardware cloth and a whole lot of glue. This lower grid is still used today.
</p>
<p>
In 2015, we scrapped the Hill 320 controller and started using <a href="images/9ch_dumb.png">Dumb RGB Controllers</a> to convert the DMX signals to 12V data that could be directly feed into the <a href="christmas/2001/boxes/ssrs.jpg">Solid State relays</a> that still switched the 110V AC current for the lights (<a href="https://www.youtube.com/watch?v=mOmyryUlp3c">Video</a>). This allowed control signal for all lights to be supplied via a single CAT-5 cable.  The Linux PC would calculate the number of seconds remaining until Christmas and what segments in the 7-segment display need to be lit up, and then sends out the correct DMX signal so that the correct lights are lit on the display.  
</p>
<p>
In 2017, we finally scrapped the peg board and incandescent mini-lights and converted the top half to use pixels as well. Everything is still powered by <a href="https://github.com/ghormann/GregsLights">custom source code</a>.
</p>
   </div><!--sm-8-->
</div><!-- Row -->


<br><br>

<h2>Pictures</h2>
<font size=-2 color="brown">(Click image to enlarge)</font><br>

<?php
labledPicture("christmas-thumb", "christmas/2003/IMG_0870.JPG", "Original Clock (2003)", "");
labledPicture("christmas-thumb", "christmas/2002/clock_back2.JPG", "Original Clock (2002)", "");
labledPicture("christmas-thumb", "christmas/2004/Outside/normal_size/IMG_5997.JPG", "Original Clock (2004)", "");
labledPicture("christmas-thumb", "christmas/2014/Tree2_640.png", "Clock with Half Grid (2014)", "");
labledPicture("christmas-thumb", "images/9ch_dumb.png", "Dumb Controller (2015-2016)", "");
labledPicture("christmas-thumb", "christmas/2001/boxes/ssrs.jpg", "SSR (2002-2017).", "");

?>

<br><br>
<h2>Movies</h2>

<br><br>
<center>
<?php
   $movies = array(
       array("MnXRQG9p0ps", "Original Version", "https://img.youtube.com/vi/MnXRQG9p0ps/0.jpg"),
       array("qFUG5f9jvME", "Hitting Zero (2010)"),
       array("u8uZSKy_S0k", "Time Laps (2011)"),
       array("TuTu1zv39b0", "Time Laps (2013)"),
       array("tCQ9uxtrXfQ", "Half grid (2014)", "https://img.youtube.com/vi/tCQ9uxtrXfQ/0.jpg"),
       array("UdQGn5WxL0I", "Full Grid (2015)"),
       array("mOmyryUlp3c", "How SSR Worked (2016)"),
       array("pPuGSIxpJIA", "Oops... (2016)"),
       array("z0MqBhNhmZU", "Current Version"),
       array("aGOOmF0B3fM", "GUI Program (Current)"),
       array("IPzWfIm7C5c", "Text your name")
   );

   youtubeVideo($movies);
?>


</center>


<?php include "footer.phtml" ?>

