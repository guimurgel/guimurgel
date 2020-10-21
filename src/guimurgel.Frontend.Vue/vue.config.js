module.exports = {
    css: {
      loaderOptions: {
        sass: {
          implementation: require('sass'),
          additionalData: `
            @import "@/styles/_general";
          `
        }
      }
    }
  };