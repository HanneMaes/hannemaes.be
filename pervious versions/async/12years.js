function documentReady() {
  
  /* 12 jaar: X schrikkeljaar, - gewoo naar
  -X---X---X--
  --X---X---X-
  ---X---X---X
  X---X---X---
  */
  yearsTotal = 12
  daysTotal = (366*3) + (365*9)
  console.log('yearsTotal:', yearsTotal)
  console.log('daysTotal:', daysTotal)

  daysStructure = [7, 30, daysTotal/yearsTotal] 
  console.log('daysStructure:', daysStructure)

  // draw the graph
  var graphs = ['', '', '']

  // structure 1
  graphs[0] += '<div class="graphRow">'
  // for (i = 0; i < daysTotal/30; i++) {
  //   graphs[0] += '<div class="graphBar">' + (i+1) + '</div>'
  // }
  graphs[0] += '</div>'

  // structure 2
  graphs[1] += '<div class="graphRow">'
  for (i = 0; i < daysTotal/30; i++) {
    graphs[1] += '<div class="graphBar" style="width:' + (100/daysTotal/30) + '%;"></div>'
  }
  graphs[1] += '</div>'

  // structure 3
  graphs[2] += '<div class="graphRow">'
  for (i = 0; i < yearsTotal; i++) {
    graphs[2] += '<div class="graphBar" style="width:' + (100/yearsTotal) + '%;">' + (i+1) + '</div>'
  }
  graphs[2] += '</div>'

  // print HTML
  console.log('graphs:', graphs)
  var elem = document.querySelector('#graph').innerHTML = graphs[0] + graphs[1] + graphs[2]
}
