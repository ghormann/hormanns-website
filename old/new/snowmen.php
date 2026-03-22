<?php 
$title="Our Lighted Snowmen";
$subTitle="Snowmen";
include "intro.phtml" ?>


<center>
<?php Christmas_years(); ?>
</center>
<div class="row">
   <div class="col-sm-8">
      <h1>Snowmen</h1>
       The snowmen were added to our display in 2002. I got the idea after seeing a video by Drew Heckman at the now defunct "Christmas Cave" website of two snowmen having a snowball fight. By 2017, the snowmen were getting rather old and hard to maintain. We initially attempted to fully retire them that year, but after a few requests from the local neighborhood children, we brought them back for the end of 2017 and 2018 resulting in <a href="christmas/2016/snowman_card.jpg">praise from the neighborhood kids</a>! Knowing they could not survive another season, we fully rebuilt them in newer technology for 2019.
   </div>
   <div class="col-sm-4" style="text-align:center">
      <?php
         labledPicture("christmas-thumb", "christmas/2016/snowman_card.jpg", "Thank You Letter", "christmas/2016/snowman_card_thumb.jpg");
       ?>
   </div>
</div><!-- Row -->

<h2>Digital Version</h2>
<div class="row">
   <div class="col-sm-4 order-sm-2" style="text-align:center">
      <figure class="youtubeVideo">
         <a href="https://www.youtube.com/watch?v=GPOL_nibIAU">
            <img src="https://img.youtube.com/vi/GPOL_nibIAU/0.jpg" class="img-fluid"
                 style="border-style:none; margin: 5px 5px 5px 5px;">
            <figcaption>Video: Digital Version</figcaption>
         </a>
      </figure>
   </div><!--sm-4-->
   <div class="col-sm-8 order-sm-1">
<p>
   During 2019, we complete redesigned the snowmen from the ground up. The snowmen are now made of 5 different <a href="DMX.phtml">pixel grids</a> for a total of 13,256 RGB pixels. This makes the snowman the single largest element in our display. In an attempt to balance cost and quality, the bodies of the snowman have pixels separated by 1" while the other parts of the display use 2" spacing. The snowman leverage 5 volt pixels, about 13 power supplies, and a dedicated Falcon F16v3 controller. 

A <a href="https://github.com/ghormann/GregsLights">custom Linux program</a> controls the snowman along with the clock. The grids are held up by 1" galvanized pipe and numerous guide wires. There is a pulley system to move the grids into position on the frame.
</p>

<p>
These new snowmen are a little more flexible than the original design.  You see better arm and snowball movement, hats that can be knocked off, the ability to stick multiple snowballs on the nose or on the ground, and a neat "duck the snowball" trick.  Every so often, one of them will have had enough and pulls out a big cannon to fire a massive snowball at the other.
</p>

<p>
For 2020 we gave the snowman a new ability.  Viewers can log into our website and select one of 7 different chracters for the Snowmen on the right.   Nothing like throwing a snowball at Hans Grubber during the Holiday season!
</p>

   </div><!-- Ends the grid with top snowman video-->
</div><!--row-->

<br>
<div class="row">
   <div class="col-sm-8">
<h2>Original Version</h2>


The original snowmen were added to in 2002. While others have build snowmen using wire frames, but I didn't have access to welding materials to build the frame.  Instead, I used: 
<ul>
<li>1/2" galvanized pipe
<li>wire fence (2" by 3" spacing).
<li>Wire cloth with 1/2 holes that hold the lights
<li>Zip ties
<li>Rope Light
<li>Mini Lights (35 and 50 count)
<li>A crazy amount of hot glue
</ul>


The snowmen were really just two pieces of galvanized pipe with 4 feet (1.22 m) of wire fence between them.  For the face and arms were more density was needed, wire cloth was added on top of the wire allowing more precise with light placement. 

These snowmen only required 14 circuits to produces "animation". (Which was important at the the time, because our display  used the <a href="parallel320.phtml">320 controller</a> and we had limited circuits.)  It worked by lighting up 
different sets of lights (that represent different arm and snow ball positions)
in specific orders. This gave the impression of motion.   The circuits for each snowman were: 

<ol>
<li>Arm back to throw
<li>Arm forward to throw
<li>"Splat" in the face
<li>"Splat" on the ground
<li>Upper snowball on the nearest pipe.
<li>Lower snowball on the nearest pipe.
<li>Snowball in the middle pipe.

</ol>

The body (rope light) and face (mini lights) were static lights that were always powered. 
   </div><!-- col-sm-8-->
   <div class="col-sm-4 order-sm-2">
<!--<h2>Pictures (Original Version)</h2>
<font size=-2 color="brown">(Click to enlarge)</font>
-->
<br>
<em>
Note: Most of of these pictures were taking before I covered the mini-light cords in black electrical tape to prevent them from being seen.  In hind site, I should have used green wire.   However, as you can see in the videos the wires not visible at night.
</em>
<br>

<a href="christmas/snowmen/IMG_1141.JPG">
	<img height=120 src = "christmas/snowmen/thumb_IMG_1141.JPG" border="1" alt="">
</a>

<a href="christmas/snowmen/IMG_2445.JPG">
	<img height=120 src = "christmas/snowmen/thumb_IMG_2445.JPG" border="1" alt="">
</a>


<a href="christmas/2002/2002_snowman_3.jpg">
	<IMG height=120 SRC="christmas/2002/_2002_snowman_3.jpg" border="1" alt="2002_snowman_3.jpg">
</a>
<a href="christmas/2002/2002_snowman_4.jpg">
	<IMG height=120 SRC="christmas/2002/_2002_snowman_4.jpg" border="1" alt="2002_snowman_4.jpg">
</a>
<a href="christmas/2002/2002_snowman_5.jpg">
	<IMG height=120 SRC="christmas/2002/_2002_snowman_5.jpg" border="1" alt="2002_snowman_5.jpg">
</a>
<a href="christmas/2002/2002_snowman_6.jpg">
	<IMG height=120 SRC="christmas/2002/_2002_snowman_6.jpg" border="1" alt="2002_snowman_6.jpg">
</a>

</div><!--Col - Sm - 4 -->
</div><!-- Row Original-->

<br><br>
<h2>Pictures (Digital Version)</h2>
<?php
labledPicture("christmas-thumb", "christmas/2019/Snowman_Day/day1.jpg", "Daytime", "christmas/2019/Snowman_Day/thumbnails/day1.jpg");
labledPicture("christmas-thumb", "christmas/2019/Snowman_Day/day2.jpg", "Snowmen Grid", "christmas/2019/Snowman_Day/thumbnails/day2.jpg");
labledPicture("christmas-thumb", "christmas/2019/Snowman_Day/day3.jpg", "Snowmen + Splash", "christmas/2019/Snowman_Day/thumbnails/day3.jpg");
labledPicture("christmas-thumb", "christmas/2019/Snowman_Day/day4.jpg", "Daytime", "christmas/2019/Snowman_Day/thumbnails/day4.jpg");
labledPicture("christmas-thumb", "christmas/2019/Snowman_Day/day5.jpg", "F16 Controller", "christmas/2019/Snowman_Day/thumbnails/day5.jpg");
labledPicture("christmas-thumb", "christmas/2019/snowman_basement.jpg", "Construction", "christmas/2019/snowman_basement_120.jpg");
labledPicture("christmas-thumb", "christmas/2019/snowmen_close.jpg", "Pixels", "christmas/2019/snowmen_close_120.jpg");
?>

<br><br>
<h2>Movies</h2>

<center>

<?php
   $movies = array(
             array("0W53e9QcRPk", "2020 (Voter Selectable)"),
             array("GPOL_nibIAU", "2019 (Digital)"),
             array("PEzZA8v5mrQ", "2019 Daytime"),
             array("YY1jnphglgw", "2012 (Original)"),
             array("WD2kRBD6h4U", "2010 (Origianl)"),
             array("Z6t6t1zBcxU", "2008 (Original)", "https://img.youtube.com/vi/Z6t6t1zBcxU/0.jpg")
   );

   youtubeVideo($movies);

?>

</center>

<?php include "footer.phtml" ?>

