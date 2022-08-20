export default {
   "transform": {
      "^.+\\.(js|jsx)$": "babel-jest"
   },
   "moduleNameMapper":{
      '^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js'
   },
}