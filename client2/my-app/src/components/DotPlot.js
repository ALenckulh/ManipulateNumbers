import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function DotPlot () {
  const x = [1, 2, 3, 4];
  const y = [10, 11, 12, 13];

  const data = [{
    x: x,
    y: y,
    mode: 'markers',
  }];

  const layout = {
    title: 'Gráfico de Pontos',
    xaxis: { title: 'Eixo X' },
    yaxis: { title: 'Eixo Y' }
  };

  useEffect(() => {
    // Renderizar o gráfico somente no cliente
    Plot.newPlot('plot', data, layout);
  }, []); // Executar apenas uma vez, após a montagem do componente

  return <div id="plot" />;
}
