import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import './Shape.css';

export type ShapeData = number[][];
interface ShapeProps {
  data: ShapeData;
}

const Shape: FC<ShapeProps> = ({ data }) => {
  const [selected, setSelected] = useState<HTMLDivElement[]>([]);
  const [processing, setProcessing] = useState(false);

  const {
    0: { length: cols },
  } = data;
  const delay = 500;

  const boxes = useMemo(() => data.flat(), [data]);
  const visibleBoxes = useMemo(() => boxes.filter(Boolean).length, [boxes]);

  const styles = {
    gridTemplateColumns: `repeat(${cols}, 100px)`,
  };

  const clickHandler = (
    event: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const { target } = event;
    if (
      !processing &&
      target.classList.contains('box') &&
      !target.classList.contains('selected')
    ) {
      target.classList.add('selected');
      setSelected((selected) => [...selected, target]);
    }
  };

  useEffect(() => {
    if (selected.length === visibleBoxes) {
      setTimeout(() => {
        setProcessing(true);
        selected.forEach((el, ind) =>
          setTimeout(() => {
            el.classList.remove('selected');
            if (ind === selected.length - 1) {
              setSelected([]);
              setProcessing(false);
            }
          }, ind * delay)
        );
      }, delay);
    }
  }, [selected]);

  return (
    <div
      className={'container' + (processing ? ' processing' : '')}
      style={styles}
      onClick={clickHandler}
    >
      {boxes.map((boxValue, index) => {
        const classNames = ['box'];
        !boxValue && classNames.push('hidden');
        return (
          <div
            key={`${boxValue}-${index}`}
            className={classNames.join(' ')}
            data-index={index}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
