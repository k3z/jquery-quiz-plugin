*************************
Simple jQuery Quiz plugin
*************************

* Questions are stored in a json file and loaded with an ajax request.
* Players progression is saved after each answer.
* Player can leave the quiz and come back later to finish.

I use a litle bit php to store players result in a session. But you can adapt this easely easely to any language.

TODO : wrtite plugin usage


Prerequisite
------------

* `PHP`
* `Bower <https://github.com/bower/bower>`_
* `Grunt <http://gruntjs.com/getting-started>`_
* `LiveReload Browser extension <http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions->`_

Bower And Grunt need :

* `NodeJS <http://nodejs.org/>`_
* `npm <http://npmjs.org/>`_


Installing Bower
^^^^^^^^^^^^^^^^

Bower is installed globally using npm:.

::

    $ npm install -g bower


Installing Grunt
^^^^^^^^^^^^^^^^

Install Grunt's command line interface (CLI). Grunt will be only installed in your project folder.

::

    $ npm install -g grunt-cli


Installing project-bootstrap
----------------------------

Checkout the project.

::

    $ git clone https://github.com/k3z/project-bootstrap.git


Run Bower to download dependencies

::

    $ cd <project-root>/
    $ bower install


Bower components are now in www/assets/components/


Run Grunt to initialize project

::

    $ cd <project-root>/
    $ npm install
    $ grunt


Development files are now in www/assets/build/.

To get production files run:

::

    $ grunt production


Bower Components
----------------

You can add more components in bower.json config file.

::

    {
        "name": "project bootstrap",
        "dependencies": {
            "jquery": "1.8.x",
            "components-bootstrap": "2.3.x",
            "font-awesome": "3.0.2"
        }
    }


Grunt watch & LiveReload
------------------------

Grunt can observe you files and execute somme tasks automaticaly.

To run Grunt in background

::

    $ grunt watch


LiveReload
^^^^^^^^^^

Grunt Watch has support for Livereload. To enable it in your browser install `LiveReload extension <http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions->`_
