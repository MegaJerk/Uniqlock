# Uniqlock Rewind
***A modern web standards remastering of an old Flash advertisement campaign by Uniqlo.***

> 	Time and motion  
>		Time and tide  
>		All I know and all I have is time, and time and tide is on my side!  
>   — King's Lead Hat, Brian Eno


On June 15th, 2007, the Uniqlock was released online and would go on to become one of the most well received and interesting marketing campaigns on the internet. With 6 seasons of releases, 10 years of time passed, and Adobe Flash's looming death-date on the horizon, the Uniqlock would be unceremoniously taken offline in early 2017. Just 3 years later on December 31st, 2020, Adobe Flash Player would be removed from Microsoft Windows automatically via an update, making running the Uniqlock screensavers (which were just utilizing .swf files at their core) a difficult and potentially dangerous task.

With the official files and website being wiped off the net, anyone wanting to experience the Uniqlock would either need to find a (hopefully safe) archive of the files, or watch from the small collection of captured footage posted to YouTube. With neither experience being particularly fun or practical. Uniqlock usage sank to an all-time low.

That is... Until today!

Using all of the latest available ***standard*** web technology, I have painstakingly labored to create the most accurate Uniqlock experience to date, completely and totally Adobe Flash free! Combing through my own personal archives and a well preserved online backup of the Uniqlock, I was able to extract (what is, as far as I can tell) every piece of media used to create every season of the Uniqlock; And have combined them into a near 1:1 experience that runs in almost any modern browser.

Though the era of internet that helped to create the Uniqlock is long gone, Uniqlock Rewind is my attempt at preserving at least some small part of what made those days so special, and to provide, for the generations of people who may have missed it, an opportunity to find themselves helplessly hypnotized by the charm and design of this fun little clock.



## How To Use

Simply [Click Here](https://megajerk.github.io/Uniqlock/)!

*please see the [known issues](https://github.com/MegaJerk/Uniqlock#known-issues) section if you're a firefox user*

If you'd like to run it locally, [download the latest release](https://github.com/MegaJerk/Uniqlock/releases). Just remember that you'll need to open some sort of web server to get it working as this uses Web Workers, which are blocked from running under the file: protocol. An easy way to do that would be to:

1. Download Visual Studio Code

2. Open the Directory containing the Uniqlock Rewind project

3. Open the index.html file

4. Click on the "Go Live" icon in the bottom right-hand side of the editor.
	![An image showing Visual Studio Code opened to the index html file of this project, and the Go Live button highlighted](https://github.com/MegaJerk/Uniqlock/blob/main/media/Opening%20A%20Live%20Preview.png?raw=true)
	

That *should* launch the page locally, and allow everything to work as intended.
![An animated gif showing the splash screen to this program, a mouse cursor moving into position on the screen, and then a click event which triggers the clock to start counting](https://github.com/MegaJerk/Uniqlock/blob/main/media/Starting%20The%20Clock.gif?raw=true)



## Current (Missing) Features

The version 1.x release is all about creating parity with the Flash versions of the clock. Because so much has already been implemented, it's easier to list which features are still missing

### Season 3 - Videos

- Season 3 introduced a series of animated characters (which I will call 'germs' from now on) for a handful of videos. All scenes that feature the germs, with the exception of the On The Hour videos, are all duplicates of non-germ videos. However, the most interesting thing about them is that their color matches the color of the Uniqlock for the given hour it's on.

	Here is a frame taken from a video featuring germs: ![An image showing the animated characters "germs" and their orange / brownish color, in a typical dance video clip](https://github.com/MegaJerk/Uniqlock/blob/bef0a67c9e7d1d0650e4ae88531a09638d55cf9e/media/Season%20-%203%20-%20Germs%20-%20Correct.png?raw=true)

	And here is an image taken of the actual time clock during that hour: ![An image showing the Uniqlock's time of 03:11:33 with a orange / brownish background](https://github.com/MegaJerk/Uniqlock/blob/main/media/Season%20-%203%20-%20Germ%20Color.png?raw=true)
	
	But looking at the raw video, we find:
	![An image showing how a Chroma Key is not being applied to animated characters in Season 3 of the Uniqlock Rewind project](https://github.com/MegaJerk/Uniqlock/blob/bef0a67c9e7d1d0650e4ae88531a09638d55cf9e/media/Season%20-%203%20-%20Germs%20-%20Incorrect.png?raw=true)

	Flash was able to do some sort of Chromakey / Masking that made replacing one color value with another doable, apparently! I have not in any way implemented a similar feature into Uniqlock Rewind, but have done a little research which suggests that something similar is possible if I were to use the `<canvas>` element and a little magic. It's not high priority but I would like to at least see if I could get it working, and implemented assuming it doesn't destroy performance.

### Season 4 - Hour Videos

- Missing the small clock that appears near the bottom of the screen during Hour Video playback.
	![An image showing a frame from one of the Season 4 On-The-Hour videos, and the mini-clock it shows near the bottom of the screen](https://github.com/MegaJerk/Uniqlock/blob/main/media/Season%204%20-%20On-The-Hour-MiniClock%20-%20Day.png?raw=true)

	- Missing the 'reflected' image of the small clock during night Hour Video playback.
	![An image showing a frame from one of the Season 4 night time On-The-Hour videos, and the mini-clock and the mini-clock's reflection it shows near the bottom of the screen](https://github.com/MegaJerk/Uniqlock/blob/main/media/Season%204%20-%20On-The-Hour-MiniClock%20-%20Night.png?raw=true)

- Missing the ability to specify that the hour videos *should* follow the Time of Day, but do not care about the current hour.

I can't promise that *every* feature will be implemented in a quick way, but will do my best to get this as close to the original as possible.



## Current Work

Before adding any more features, there are plenty of things that need to be done to the project in the here and now. Code consolidation, full code commenting, and utilizing IndexedDB as a way to cache stuff are just a few of the things I'll be busy with for the moment. I could have tried to get all of those things in *before* I made it public, but I was simply too excited and wanted to share every comment-based spelling mistake I've ever made with anyone who has access to an active internet connection! 



## Future Goals

As I work on getting this version as solid as possible, it is my desire to eventually start working on what I think of as Version 2. In that future version I would like to introduce the ability for a user to be able to completely customize their Uniqlock experience. From being able to toggle on or off any particular season, videos, and music. As well as setting things like when the Night Time or Midnight Hours should start or finish.

After that, the tentative idea for a Version 3 would be giving users the ability to upload their own custom music and videos to use with the clock, to either be seamlessly integrated with the existing media, or used to replace it all together!

Somewhere along the line (perhaps version 1.5!) I would also like to package this project up using Atom or some other cross-platform wrapper, that would allow for people to once again run the Uniqlock locally as a screensaver or program in a way that doesn't require any internet connectivity.



## Known Issues!

Mobile performance is still not that impressive. CPU power just isn't able to do what needs to be done to get certain videos ready to play regardless of connection speed. I have found that by using an AV1 codec I can create some astoundingly small video files, but will need to investigate browser support / compatibility before committing to that.

If you find any more oddities (or have suggestions on how to fix a thing), please open up a ticket or make a request!



## Disclaimer

The original Uniqlock project, its media, and all things belonging to the Uniqlo Brand Identity are a product of, belong to, and assumed to be copyrighted by Uniqlo Co., Ltd, and created in part by:
- Projector Inc.
- Paragraph
- Monster Films
- Monster ULTRA INC.
- Fantastic Plastic Machine
- Yuichi Kodama
- Air:man / Core of Woomin
- Kashiwa Sato
- Yugo Nakamura
- Markus Keirsztan
- tha.ltd.

For a more thorough breakdown of who worked on what and other information regarding the Uniqlock, see the following sources:

- [Uniqlo Project List](https://www.uniqlo.com/hk/corp/media/projects/2006/)
- [Uniqlock 1 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock/)
- [Uniqlock 2 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock2/)
- [Uniqlock 3 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock3/)
- [Uniqlock 4 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock4/)
- [Uniqlock 5 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock5/)
- [Uniqlock 6 Project Details](https://www.uniqlo.com/hk/corp/media/projects/uniqlock6/)
- [Interview w/ Koichiro Tanaka from Projector Inc](https://adage.com/article/behind-the-work/projector-s-koichiro-tanaka-explains-uniqlock/126141)
- [Projector Inc.'s Website](https://www.projector.jp/)
- [Kashiwa Sato's Uniqlo Project Page](https://kashiwasato.com/project/6821)
- [Creative Review article - Uniqlo Reborn](https://issuu.com/lukasz/docs/uniqlo_creative_review)
- [Tha ltd. - Uniqlo Projects](https://tha.jp/works?q=uniqlo)
- [Hyperbeast article about the music, choreography, and dancers](https://hypebeast.com/2007/6/uniqlock-uniqlo)
- [3 Page Interview with Kazutaka Sugitani and Mayumi Kikuguchi of Choreography Air:man](https://www.highflyers.nu/hf/airman1/)
- [Air:Man - website](http://furitsukekagyou-airman.com/)

If you believe that this project has violated your copyright, feel free to contact me for clarification / removal.

Thank You.



## Special Thanks and Ending Credits

Shout Outs and Special Thanks to:

- Daniel Tian (https://github.com/danieltian/unique-clock) and Turious (https://github.com/Turious/unique-clock) for creating some sort of starting point out here on GitHub

- Screensavers Planet™ for [hosting](https://www.screensaversplanet.com/help/guides/windows/how-to-install-all-missing-uniqlo-seasons-57) the final version of the Uniqlock / Calendar screensaver, which had a complete collection of every video used

- Rani Baker whose constant progress in hacking and code-work inspired me to shut-up and actually get to the dirty work and the joy of taking something apart and putting it back together - in your own way. You're deeply missed.

---

This software is dedicated to the countless others who have watched some of the most interesting parts of the internet come and go, and are now left with only vague memories. So much of the online experience is made up of hatred, blasé nihilism, and an endless torrent of speculative get rich schemes; it’s easy to forget that online culture wasn’t always rooted in those insincerities. Though this silly little clock won’t fix the world, I do hope that perhaps at least some people will find the joy in having a simple and fun experience that can be shared across any border or barrier. With any luck, you too may find the inspiration to start working on your own simple and fun experiment.

I look forward to seeing it.