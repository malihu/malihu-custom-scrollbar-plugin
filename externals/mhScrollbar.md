#Angular module for Malihu Scrollbar plugin

This simple angular module enable the use of the malihu scrollbar plugin on an application write with the javascript framework AngularJS. The plugin is very simple it just activate the plugin on the element where it is, adding as extra functionality the configuration of the plugin with html attributes.

To use the module it's necessary include it on the HTML with the malihu library, and add it to the main module of the target angular application.

    angular.module('targetApp', ['
        'firstDependency',
        'secondDependency',
        'nDependency',
        'malihu.scrollbar'
    ']);

In the html side you can use it including the attribute mh-scrollbar to the target element where we want use it.

        <div class="row" 
                uit-scrollbar
                    mcs-theme="minimal-dark"
                    mcs-scroll-inertia=300>
        </div>

All the configurations supported by the plugin can be setted if we write it as attribute next to the directive, adding "mcs" before the configuration name and splitting the name with hyphen replacing the camel Case.

For example:

* setTop => mcs-set-top=300
* scrollbarPosition => mcs-scrollbar-position="inside"



