
while($a = <>)
{
    chop($a);
    print "<a href=\"christmas/2003/$a\">\n";
    printf"\t<IMG SRC=\"christmas/2003/thumbnails/$a\" border=\"1\"></a>\n\n";
}
