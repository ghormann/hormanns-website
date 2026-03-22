
:root {
  --menu-bg-color: #EBBD82;
  --title-color: brown;
}

body {
    background: #F8F5D6;
}

.old-picture {
   text-align: center;
}

.old-picture img {
    padding: 2px;
}

.navbar-greg {
   background-color: var(--menu-bg-color);
}

.navbar-greg a {
   color: var(--title-color);
}

.navbar-greg .dropdown-menu {
   background-color: var(--menu-bg-color);
}

.toggler-greg .navbar-toggler-icon { 
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E"); 
} 

.navbar-toggler-icon {
    background-image: $navbar-dark-toggler-icon-bg;
  }

.btn-group {
    margin-right: 5px;
    margin-bottom: 10px;
}

figure.youtubeVideo {
    display:inline-block;
    padding-left:5px;
    padding-right:5px;
}

figure.youtubeVideo figcaption {
   text-align:center;
}

figure.youtubeVideo img {
   border-style:none; 
   height:200px
}

figure.youtubeVideosm {
    display:inline-block;
}

figure.youtubeVideosm figcaption {
   text-align:center;
}

figure.youtubeVideosm img {
   border-style:none; 
   width:350px
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -1px;
}

/*
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top:   12px dashed;
  border-top:   12px solid ~"\9"; // IE8
  border-right: 12px solid transparent;
  border-left:  12px solid transparent;
}
*/


.titleBG {
  background: #EBBD82;
}

.titleBG2 {
  background-color: #cad1d8;
}

.navbar {
  padding-top: 0px;
}

.logo {
  color: brown;
  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-weight: bold;
  font-size:50px;
}

#subTitle {
  color: brown;
  font-family: "Times New Roman", Times, serif;
  font-style: italic;
  font-size:30px;
  align-self: flex-end;
  text-align:left;
}

.gjh-table-row {
  padding-bottom:5px;
  padding-top:5px;
  border-style: groove;
}

figure.christmas-thumb {
  display: inline-block;
}

figure.christmas-thumb figcaption {
  text-align: center;
}

figure.christmas-thumb img {
  height: 120px;
}

figure.christmas-thumb-tall {
  display: inline-block;
}

figure.christmas-thumb-tall figcaption {
  text-align: center;
}

figure.christmas-thumb-tall img {
  max-width: 180px;
}

.bottom-logo {
  text-align: center;
}

.space-after-row {
  padding-bottom: 1em;
}
