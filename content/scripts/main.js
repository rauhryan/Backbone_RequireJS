require({
    paths: {
        underscore: "util/underscore-wrapper"
    }
},
['util/content-builder', 'util/module-activator'], function (builder, activator) {
    activator.execute();
    builder.execute();
});