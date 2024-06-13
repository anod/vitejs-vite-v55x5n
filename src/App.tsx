import './App.css';
import Shape, { ShapeData } from './components/Shape';

function App() {
  const data: ShapeData = [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ];

  return (
    <>
      <Shape data={data}></Shape>
      <pre>
        {JSON.stringify(data)
          .replaceAll('],[', '],\n  [')
          .replace('[[', '[\n  [')
          .replace(']]', ']\n]')}
      </pre>
    </>
  );
}

export default App;
