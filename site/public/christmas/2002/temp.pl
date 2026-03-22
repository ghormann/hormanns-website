
while($a = <>)
{
    chop($a);
    $b = $a;
    $b =~ s/^\_//;
    print "<a href=\"christmas/2002/$b\">\n";
    printf"\t<IMG SRC=\"christmas/2002/$a\" border=\"1\" alt=\"$b\">\n";
}
