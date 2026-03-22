<?php 
$title="Our Large Grid";
$subTitle="Grid";
include "intro.phtml" ?>

<div class="container-fluid"><!--Main Container -->

<center>
<?php Christmas_years(); ?>
</center>
<h1>Large Grid</h1>

The large grid on the house was added to our display in 2015. Plenty of others have created grids, but our goal was to go over the top and create a very large grid.  We ended up with an 18ft x 8ft grid mounted over our front door.
<br><br>
The grid is constructed using 
<ul>
<li>5 sheets of <a href="http://www.holidaycoro.com/product-p/775.htm">PixNode Mounting Net</a>.  We initially tested with 3" spacing, but end up using 2" spacing in the final design.
<li>4876 <a href="http://www.holidaycoro.com/Smart-Pixel-LED-RGB-8mm-12mm-Nodes-12v-DC-p/711.htm">12V RGB Smart "Bullet" Pixels </a>
<li>2 <a href="http://www.holidaycoro.com/AlphaPix-4-V2-RGB-Pixel-Controller-p/722-v2.htm">AlphaPix 4</a> controllers
<li>8 <a href="http://www.holidaycoro.com/350w-Dual-Output-Power-Supply-p/49.htm">12v 350Watt Power Supplies</a> (<i>Overkill now that we run at 25% power.</i>)
<li>loads of 4" Zip ties to secure the sheets together
<li>Multiple Spools of 14 gauge underground landscape wiring to supply all the power needed.
<li>A <a href="https://www.pssl.com/Lighting-Truss?c=C0000N98&noidx=1&by=Category">professional lighting truss</a> (<i>The first year, galvanized pipe was used. Wasn't a good choice.</i>)
</ul>

<br>

<h2>Pictures</h2>
<font size=-2 color="brown">(Click image to enlarge)</font><br>

<?php
labledPicture("christmas-thumb", "images/20151019_pixel.jpg", "Single Bullet Node", "");
labledPicture("christmas-thumb", "images/20151128_pixel.jpg", "Multiple Bullet Node", "");
labledPicture("christmas-thumb", "images/20151107_family_grid.jpg", "Family infront of Grid", "");
labledPicture("christmas-thumb", "images/20160103_grid2.jpg", "Front of Grid (Stored)", "");
labledPicture("christmas-thumb", "images/20160103_grid.jpg", "Back of Grid (Stored)", "");

?>


<br><br>
<h2>Movies</h2>

<center>

<?php
   $movies = array("HjcuMDTyxBY","9T0EQ4NDi6g", "57d6a8jikfk", "LVqmA2NZAa4", "EhCaSn63lMk");

   foreach ($movies as $mov)
   {
      echo("<a href=\"https://www.youtube.com/watch?v=$mov\">");
      echo("<img class=\"img-fluid\" src=\"https://img.youtube.com/vi/$mov/0.jpg\" ");
      echo("style=\"border-style:none; margin: 5px 5px 5px 5px;\">" );
      echo("</a>");
   }
?>


</center>

<?php include "footer.phtml" ?>
</div><!-- Main -->
