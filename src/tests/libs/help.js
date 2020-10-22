const showHelp = () => {
  console.log(`
    Command syntax
    
    yarn test2 [controllerName]:[actionName]
    
    
    Example:
    
    yarn test2 posts:create
  `)
};


module.exports = {
  showHelp
};