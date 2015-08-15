# Imgen

For about a year I have been using an Android app called [Tapet][]. Tapet
generates wallpapers for your phone on a schedule. This was a nice alternative
to my usual black background. Wanting a project to facilitate my learning of C++
and inspired by [Tapet][] I began making Imgen.

The original concept for Imgen was much the same as [Tapet][]'s - something to
generate infinite wallpapers. However as I began thinking about the project
I decided this didn't abide by the unix philosophy that "a program should do one
thing and do it well". I further abstracted the idea to be just procedural image
generation, leaving the wallpaper setting and the scheduled changing to already
existing software.

## Motivation

Other than wanting to have a fancy new wallpaper every hour I also wanted
a project to learn C++. Frequently whilst developing [PMM][] and [MagWiz][]
I found myself becoming frustrated with the limitations and verbosity of Java.
I had played with C++ before going to university and so was already aware of
it's flexibility which is why I chose to learn the language. I also wanted to
a project to put on my portfolio that I could give source code for and that
wasn't about magnets as I was worried about its singularity.

## Design

As I began to think about Imgen I decided on a palette and pattern model. The
palette was to provide the colours and the pattern decides on the structures in
the image. This meant that either model could focus solely on one part of the
image. It also adds a new element of randomness to the generated images, as you
can use the same pattern, with the same seed but with a different palette.

Originally I had the palette just present a random amount of colours, later,
when I began making some patterns I found that I wanted to be able to request
a certain amount of colours or request at least X colours. To solve this
I changed the API such that a palette created the colours on demand, allowing
for these parameters.

I then wanted a way for someone using Imgen to easily add their own patterns and
palettes _without_ having to recompile Imgen. I eventually decided to expose an
interface to python to allow the patterns and palettes to be implemented as
python classes. I did this using [Boost Python][]. When implementing something
into Imgen I wanted to keep these two interfaces as two distinct entities. This
means that the C++ classes do not make any reference to Python constructs.  In
other projects I have highly valued this sort of loose coupling as I find it
helps me solve problems easier, only having to think about one entity.

For the image rendering I chose [Cairo][] as it has good merits. It has been
considered for introduction into the C++ standard and large libraries such as
GTK use it. I also discovered that [Cairo][] had some existing python bindings.
Originally I planned on using those bindings however I wanted to hide as much of
the technicalities from the palette and pattern classes, such that you only had
to think about what you're going to draw, not all the finicky details of
initializing an image. I struggled with finding a way of passing the graphics
instance from C++ to Python in such a way that I could use the existing bindings
so I chose to forego the existing bindings and added facades for an image and
graphics context.

Lastly, for color representations I used the excellent [Boost GIL][]. This
already has many different color models and is easily allows the addition of new
color models. Conversion between color models is just as easily done.

## Conclusion

Having implemented all of this, the foundation is quite solid. I have now
started implementing different palettes and patterns as I am inspired. These are
previewed at the top of this post. I am hoping to eventually get contributions
from other people with more artistic talents than me. As such I have been
extending the Imgen API as I find something is missing until I am happy enough
to introduce it to other people, at which point I will happily take suggestions.
I feel I am approaching this goal slowly, with a few hurdles to jump before I am
there.

As a final note, Imgen is free, open source software and can be found on my
Github [here][1].

[Tapet]: https://play.google.com/store/apps/details?id=com.sharpregion.tapet
[PMM]: pmm.html
[MagWiz]: magwiz.html
[Boost Python]: http://www.boost.org/doc/libs/1_58_0/libs/python/doc/
[Boost GIL]: http://www.boost.org/doc/libs/master/libs/gil/doc/index.html
[Cairo]: http://cairographics.org/
[1]: https://www.github.com/maddisoj/imgen
