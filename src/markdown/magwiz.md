# MagWiz

As part of my degree I did a year in industry. My placement was with a company
called [MasterMagnets][], a small company based in Redditch who primarily
manufacture and sell industrial separation magnets. These are either
electromagnetic or permanent magnets and can be up to 5 meters in width and
length. [MasterMagnets][] used a program that would help them decide what
magnet would be ideal for a customer, or how they could adjust an offered magnet
to lower the price and thus get the competitive edge over a competitor.

This program was written in [QBasic][] by a mechanical engineer in the late 80s.
The biggest issue this presented was the compatibility of the software. It would
not run natively on the then current version of Windows (Windows 7) and had to
be ran through an emulator. The program would then frequently crash, due to it's
age did not have a modern user interface or mouse interaction and things such as
printing had to be done by taking a screenshot and printing that. To reliably
use the software there was a lone Windows 98 machine in the corner of the
office. My job was to remake this software in Java.

## The Original Code

The original code was far from pretty. To name some of the issues there were no
comments, no variable name was more than **three** letters long and there were
literal constants everywhere. To give you an idea of the typical line of code
here is an extract from a drawing routine:

```BASIC
 mm = 1.32: yr = 340 / (1.5 * mm * hm): xr = 639 / (1.5 * mm * wm)
 rr = yr: IF xr < yr THEN rr = xr
 xr = rr * mm: yv = 80: yz = 75: yu = 85
 LINE (320 - xr * wb / 2, yv)-(320 + xr * wb / 2, yv + rr * yy), 6, BF
 LINE (320 - xr * wb / 2, yv)-(320 + xr * wb / 2, yv + rr * yy), j3, B
 LINE (320 - xr * ws / 2, yv + rr * yy)-(320 + xr * ws / 2, yv + rr * (fs + yy)), 6, BF
 LINE (320 - xr * ws / 2, yv + rr * yy)-(320 + xr * ws / 2, yv + rr * (fs + yy)), j3, B:
 LINE (320 - xr * dc / 2, yv + rr * (fs + yy))-(320 + xr * dc / 2, yv + rr * (hc + fs + yy)), 6, BF
```

There were thousands of lines of code like this all containing the secrets of
the magnets. To top it all off something not uncommon in BASIC code is the GOTO
statement, this alone is something frowned upon in modern code due to it leading
to code that's hard to follow. QBasic took the GOTO statement one step further,
it allowed you to omit the statement just declaring a line number. So mixed into
all of the literals would be a disguised GOTO statement... I still have
nightmares.

My entry point into deducing the meaning of some variables was looking at the
code which took user values, I knew what the number I was putting in was so
I could then pause the execution and see which variable contained the value
I just entered. This gave me a base set of variables to work from. Given this
base set I could then extract a block of code into it's own script and refactor
it with meaningful variable names. This allowed me to then deduce the meaning of
variables whose value was the composite of the base set and so on. There are
still variables that I could not deduce the meaning of and haunt me to this day.

This gave me a huge appreciation for documentation, good coding style and modern
compilers and debuggers.

## MagWiz

I was the sole developer on MagWiz with a consultant visiting fortnightly to
guide me in managing the project. I had the responsibility of establishing
a development environment, communicating with the users to establish their
requirements and keeping the project on track.

When I arrived I was given a fresh machine on which I installed ArchLinux.
I made a report outlining the importance of VCS and an off site repository so
that my manager could understand. I chose to use Git as the VCS with
a repository on [Bitbucket][]. At first I did not know about tools for task
automation and dependency management. I discovered [Gradle][] and soon made
heavy use of it.

The consultant and I setup an agile environment, which was perfect as I shared
an office with the users who were using the software everyday. As they thought
of something they would like we could make a story card and put it in the
backlog. I could also ask for their clarification on a story I was working on.

## Features

The overall progress of the project was very good. I had the most important
functionalities working in the Java version in a few months. This allowed use to
add further features to MagWiz, such as a way to automatically calculate the
price of any magnet.

[MasterMagnets]: www.mastermagnets.com
[QBasic]: https://en.wikipedia.org/wiki/QBasic
[Bitbucket]: https://www.bitbucket.org
[Gradle]: https://www.gradle.org
