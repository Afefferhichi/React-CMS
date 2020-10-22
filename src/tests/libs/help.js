const showHelp = () => {
  console.log(`
    Command syntax
    
    yarn test [controllerName]:[actionName]
    
    
    Example:
    
    yarn test posts:create
  `)
};


module.exports = {
  showHelp
};