const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qjx12e',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task',{
        displayNum(message){
          console.log(message)
          return null
        }
      })
    },
  baseUrl :  'https://bajratechnologies.com',

  },

  
});
