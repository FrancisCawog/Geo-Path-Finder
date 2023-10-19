/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// Your existing code to set up the map and SVG dimensions\nconst windowWidth = window.innerWidth;\nconst windowHeight = window.innerHeight;\nconst svg = d3.select('body').append('svg').attr('width', windowWidth).attr('height', windowHeight);\nconst projection = d3.geoMercator().scale(200).translate([windowWidth / 2, windowHeight / 2]);\nconst path = d3.geoPath(projection);\nconst g = svg.append('g');\n\n// Your code to load and render the map\nd3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(data => {\n  const countries = topojson.feature(data, data.objects.countries);\n  g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);\n\n  // Code to select and change the color of a specific country\n  const targetCountryName = \"Algeria\"; // Replace with the actual country name you want to target\n  const specificCountry = g.selectAll('path.country').filter(function (d) {\n    return d.properties.name === targetCountryName;\n  });\n  specificCountry.style('fill', 'red'); // Change 'red' to your desired color\n});\n\n// Your code to update the SVG dimensions on window resize\nwindow.addEventListener(\"resize\", function () {\n  const windowWidth = window.innerWidth;\n  const windowHeight = window.innerHeight;\n  svg.attr('width', windowWidth).attr('height', windowHeight);\n  // Update any other elements that depend on the window size here\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJuYW1lcyI6WyJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsInN2ZyIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInByb2plY3Rpb24iLCJnZW9NZXJjYXRvciIsInNjYWxlIiwidHJhbnNsYXRlIiwicGF0aCIsImdlb1BhdGgiLCJnIiwianNvbiIsInRoZW4iLCJkYXRhIiwiY291bnRyaWVzIiwidG9wb2pzb24iLCJmZWF0dXJlIiwib2JqZWN0cyIsInNlbGVjdEFsbCIsImZlYXR1cmVzIiwiZW50ZXIiLCJ0YXJnZXRDb3VudHJ5TmFtZSIsInNwZWNpZmljQ291bnRyeSIsImZpbHRlciIsImQiLCJwcm9wZXJ0aWVzIiwibmFtZSIsInN0eWxlIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gWW91ciBleGlzdGluZyBjb2RlIHRvIHNldCB1cCB0aGUgbWFwIGFuZCBTVkcgZGltZW5zaW9uc1xuY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgnYm9keScpLmFwcGVuZCgnc3ZnJykuYXR0cignd2lkdGgnLCB3aW5kb3dXaWR0aCkuYXR0cignaGVpZ2h0Jywgd2luZG93SGVpZ2h0KTtcbmNvbnN0IHByb2plY3Rpb24gPSBkMy5nZW9NZXJjYXRvcigpLnNjYWxlKDIwMCkudHJhbnNsYXRlKFt3aW5kb3dXaWR0aCAvIDIsIHdpbmRvd0hlaWdodCAvIDJdKTtcbmNvbnN0IHBhdGggPSBkMy5nZW9QYXRoKHByb2plY3Rpb24pO1xuY29uc3QgZyA9IHN2Zy5hcHBlbmQoJ2cnKTtcblxuLy8gWW91ciBjb2RlIHRvIGxvYWQgYW5kIHJlbmRlciB0aGUgbWFwXG5kMy5qc29uKCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3dvcmxkLWF0bGFzQDIvY291bnRyaWVzLTUwbS5qc29uJylcbiAgLnRoZW4oZGF0YSA9PiB7XG4gICAgY29uc3QgY291bnRyaWVzID0gdG9wb2pzb24uZmVhdHVyZShkYXRhLCBkYXRhLm9iamVjdHMuY291bnRyaWVzKTtcblxuICAgIGcuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKGNvdW50cmllcy5mZWF0dXJlcylcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdjb3VudHJ5JylcbiAgICAgIC5hdHRyKCdkJywgcGF0aCk7XG5cbiAgICAvLyBDb2RlIHRvIHNlbGVjdCBhbmQgY2hhbmdlIHRoZSBjb2xvciBvZiBhIHNwZWNpZmljIGNvdW50cnlcbiAgICBjb25zdCB0YXJnZXRDb3VudHJ5TmFtZSA9IFwiQWxnZXJpYVwiOyAvLyBSZXBsYWNlIHdpdGggdGhlIGFjdHVhbCBjb3VudHJ5IG5hbWUgeW91IHdhbnQgdG8gdGFyZ2V0XG4gICAgY29uc3Qgc3BlY2lmaWNDb3VudHJ5ID0gZy5zZWxlY3RBbGwoJ3BhdGguY291bnRyeScpLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQucHJvcGVydGllcy5uYW1lID09PSB0YXJnZXRDb3VudHJ5TmFtZTtcbiAgICB9KTtcblxuICAgIHNwZWNpZmljQ291bnRyeS5zdHlsZSgnZmlsbCcsICdyZWQnKTsgLy8gQ2hhbmdlICdyZWQnIHRvIHlvdXIgZGVzaXJlZCBjb2xvclxuICB9KTtcblxuLy8gWW91ciBjb2RlIHRvIHVwZGF0ZSB0aGUgU1ZHIGRpbWVuc2lvbnMgb24gd2luZG93IHJlc2l6ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIHN2Zy5hdHRyKCd3aWR0aCcsIHdpbmRvd1dpZHRoKS5hdHRyKCdoZWlnaHQnLCB3aW5kb3dIZWlnaHQpO1xuICAvLyBVcGRhdGUgYW55IG90aGVyIGVsZW1lbnRzIHRoYXQgZGVwZW5kIG9uIHRoZSB3aW5kb3cgc2l6ZSBoZXJlXG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxNQUFNQSxXQUFXLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBVTtBQUNyQyxNQUFNQyxZQUFZLEdBQUdGLE1BQU0sQ0FBQ0csV0FBVztBQUN2QyxNQUFNQyxHQUFHLEdBQUdDLEVBQUUsQ0FBQ0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUNDLElBQUksQ0FBQyxPQUFPLEVBQUVULFdBQVcsQ0FBQyxDQUFDUyxJQUFJLENBQUMsUUFBUSxFQUFFTixZQUFZLENBQUM7QUFDbkcsTUFBTU8sVUFBVSxHQUFHSixFQUFFLENBQUNLLFdBQVcsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsU0FBUyxDQUFDLENBQUNiLFdBQVcsR0FBRyxDQUFDLEVBQUVHLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RixNQUFNVyxJQUFJLEdBQUdSLEVBQUUsQ0FBQ1MsT0FBTyxDQUFDTCxVQUFVLENBQUM7QUFDbkMsTUFBTU0sQ0FBQyxHQUFHWCxHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUM7O0FBRXpCO0FBQ0FGLEVBQUUsQ0FBQ1csSUFBSSxDQUFDLCtEQUErRCxDQUFDLENBQ3JFQyxJQUFJLENBQUNDLElBQUksSUFBSTtFQUNaLE1BQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxPQUFPLENBQUNILElBQUksRUFBRUEsSUFBSSxDQUFDSSxPQUFPLENBQUNILFNBQVMsQ0FBQztFQUVoRUosQ0FBQyxDQUFDUSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQ2hCTCxJQUFJLENBQUNDLFNBQVMsQ0FBQ0ssUUFBUSxDQUFDLENBQ3hCQyxLQUFLLENBQUMsQ0FBQyxDQUNQbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNkQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUN4QkEsSUFBSSxDQUFDLEdBQUcsRUFBRUssSUFBSSxDQUFDOztFQUVsQjtFQUNBLE1BQU1hLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0VBQ3JDLE1BQU1DLGVBQWUsR0FBR1osQ0FBQyxDQUFDUSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUNLLE1BQU0sQ0FBQyxVQUFVQyxDQUFDLEVBQUU7SUFDdEUsT0FBT0EsQ0FBQyxDQUFDQyxVQUFVLENBQUNDLElBQUksS0FBS0wsaUJBQWlCO0VBQ2hELENBQUMsQ0FBQztFQUVGQyxlQUFlLENBQUNLLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7O0FBRUo7QUFDQWhDLE1BQU0sQ0FBQ2lDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZO0VBQzVDLE1BQU1sQyxXQUFXLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBVTtFQUNyQyxNQUFNQyxZQUFZLEdBQUdGLE1BQU0sQ0FBQ0csV0FBVztFQUN2Q0MsR0FBRyxDQUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFVCxXQUFXLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLFFBQVEsRUFBRU4sWUFBWSxDQUFDO0VBQzNEO0FBQ0YsQ0FBQyxDQUFDIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qYXZhc2NyaXB0LXByb2plY3QvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;