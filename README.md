# Tavtar ![](examples/logo.png)
tavtar, A simple script for generating avatar by giver text!

See: [demo](http://www.quilljou.com/tavatar/avatar?size=100&name=t)


## Installtion

-
Before use the script, you must install [cario](http://cairographics.org/) on your machine. because the package the script used depend on cario; detail see
[node-canvas](https://github.com/automattic/node-canvas)

or you can just run the command compatible with your machine os。

os | command
----- | -----
os x | `brew install pkg-config cairo pango libpng jpeg giflib`
ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
windows | [instructions on our wiki](https://github.com/automattic/node-canvas/wiki/installation---windows)

more os see [node-canvas Wiki](https://github.com/Automattic/node-canvas/wiki/_pages).

- If you want this script works fine with chinese or janpanese text, your should Install the font `WenQuanYi Micro Hei` on your machine, Otherwise the image will be messy.
detail see https://github.com/Automattic/node-canvas/issues/461;

Finally.

```shell
$ npm i navatar -S
```

## Usage

```js
cosnt Navtar = require('navatar');

// new an object
let avatar = new Avatar('name',100);

// write to disk
avatar.write('avatar.png');

// pipe as a Readable stream
avatar.stream().pipe(res)

//
avatar.toBuffer().toString('base64')
```
