# Permanent Magnet Modeller

During my final year of university part of the degree assessment was an
individual project. For my individual project I designed and developed a
permanent magnet modeller for the company with whom I had done my placement
year, [MasterMagnets][]. [MasterMagnets][] primarily build and sell industrial
separation magnets. A subset of those magnets use permanent magnets. My
individual project was to produce a program which can calculate and graphically
represent the strength of those magnets with a contour plot.

## Technologies

The software was built using Java 7 as it was a business requirement that the
software was built with the same technologies as [MagWiz][]. There was
significant prototyping in [Octave][], a FOSS equivalent of MatLab. Other
technologies used include Git for version control and Gradle for task automation
and dependency management. An agile approach was used, using [Trello][] as a
virtual storyboard.

## Modelling Technique

The project required a significant amount of research into magnets. Something I
particularly enjoyed was reading about different methods for calculating the
magnet's strength. Traditionally numerical methods are used to model
electromagnetics such as finite element analysis or boundary element analysis,
however PMM uses an analytical solution.

A typical use case for the modelling of magnets is in electric motors. In the
motors the shapes involved can be notably abstract. This is the reason the
numerical methods are traditionally used, as the discretization employed by
these techniques allows them to very closely approximate these abstract shapes.
PMM had the advantage that the type of shape to be modelled was known and that
shape was incredibly simple, a cuboid. A cuboid did not warrant the complexity
of the numerical methods and so an analytical solution was used. The implemented
equation came from a paper by [Ravaud and Lemarquand][1].

It is important to note that this did not limit the extensibility of the
project. Analytical solutions for other shapes of magnet do exist, and the
project was designed in such a way that a new shape could be easily introduced.
Failing the existence of an analytical solution for a shape, in theory it could
just be approximated by the discretization of the shape into already supported
shapes.

## Performance

Perhaps the biggest problem I encountered was that when attempting to model
a large arrangement of magnets it could take hours. When I first ran a stress
test I used an array of 500 magnets on a 1m square grid with 10mm intervals. PMM
took 6 hours to calculate the resulting field. This was due to two factors:

1. To produce a contour plot you must calculate a grid of points and that grid
   must be granular enough to allow for confident interpolation between those
   points. A more granular grid also produces a smoother contour plot. For a
   meter squared grid with ten millimeter intervals this would be approximately
   10,000 points.

2. To calculate the compound strength of the magnets, each magnet's individual
   strength must be calculated at each point. The compound strength is then the
   sum of those individual strengths, when in a vacuum.

These two factors combined meant that in the mentioned scenario there would be
about 5,000,000 points to calculate. Each point involving costly matrix
operations and trigonometric functions. This particular scenario would take six
hours to model.

### Solution

In the typical scenario most of the magnets would have the same properties, the
only differing property would be their position. This property was abused to
prevent the recalculation of points for a magnet.

There are two properties of a magnet that determine it's strength at a
particular point:

1. the magnet's polarization which is the direction of the magnetic poles and
   their magnitude.

2. the magnet's size.

Both of these properties are vectors and so boil down to six numbers. These six
numbers were used with the FNV hashing algorithm to produce an identifier for
a magnet based on the polarization and dimensions. Using this unique identifier
a table of strengths at points relative to the magnet could be cached.

This meant that for any magnet, the strength at any particular point would only
have to be calculated once. When the scenario involves a repeated magnet the
cached results could be easily retrieved, skipping over the costly calculations.
All in all this resulted in a huge performance increase. For the stress test
scenario given earlier it would now take approximately 30 seconds to calculate.

## Conclusion

The project was very exploratory as I knew very little about modelling
techniques or magnet going into it. Due to this exploratory nature the project
did not reach a point of commercial benefit in the time I had to develop it.
However it has proven the viability of modelling MasterMagnet's magnets. Despite
this I thoroughly enjoyed the project and I learned a lot ranging from
mathematical techniques to new tools.

[MasterMagnets]: www.mastermagnets.com
[Octave]: http://www.gnu.org/software/octave/
[MagWiz]: magwiz.html
[Trello]: https://trello.com
[1]: http://www.jpier.org/PIER/pier.php?paper=09091704
