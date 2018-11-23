'use strict';

var CLOUD_WIDTH = 420;       // ширина облака
var CLOUD_HEIGHT = 270;      // высота облака
var CLOUD_X = 100;           // начальная координата облака по горизонтали
var CLOUD_Y = 10;            // начальная координата облака по вертикали
var GAP_SHADOW = 10;         // смещение тени облака
var GAP_GRAPH = 50;          // расстояние между колонками
var GRAPH_WIDTH = 40;        // ширина колонок
var GRAPH_HEIGHT_MAX = 150;  // максимальная высота колонки
var MARGIN_SIDE = 30;        // поля по бокам
var MARGIN_HEIGHT = 15;      // поля сверху и снизу
var FONT_SIZE = 16;          // размер шрифта
var FONT_FAMILY = 'PT Mono'; // семейство шрифтов
var fontGap = Math.round(FONT_SIZE * 1.0);         // межстрочный интервал
var currentFont = FONT_SIZE + 'px ' + FONT_FAMILY; // текущий шрифт

// Функция для отрисовки облака с тенью:
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Расчет максимального значения параметра:
var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
// Рисуем облако с тенью:
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

// Пишем заголовок облака: НЕОХОДИМО СДЕЛАТЬ ФУНКЦИЕЙ
  ctx.fillStyle = '#000';
  ctx.font = currentFont;
  ctx.fillText('Ура Вы победили!', CLOUD_X + 50, CLOUD_Y + MARGIN_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + 50, CLOUD_Y + MARGIN_HEIGHT + fontGap);

// Проверяем равенство массивов names и times:
  if (names.length > times.length) {
    times(times.length) = 0;
  } else if (names.length < times.length) {
    names(names.length) = 'Инкогнито';
  }

// Считаем максимальное время игроков:
  var maxTime = Math.round(getMaxElement(times));

// Функция для выбора случайной насыщенности цвета столбцов гистограммы:
  var getRandomSaturate = function() {
    var saturate = Math.floor(Math.random() * 101);

    return 'hsla(240, ' + saturate + '%, 50%, 1)';
  }

// Строим гистограмму:
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + MARGIN_SIDE + (GRAPH_WIDTH + GAP_GRAPH) * i, CLOUD_HEIGHT + CLOUD_Y - (MARGIN_HEIGHT + (GRAPH_HEIGHT_MAX * times[i]) / maxTime + FONT_SIZE + fontGap *2));
    ctx.fillText(names[i], CLOUD_X + MARGIN_SIDE + (GRAPH_WIDTH + GAP_GRAPH) * i, CLOUD_HEIGHT + CLOUD_Y - MARGIN_HEIGHT);

  // Устанавливаем цвет колонок:
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomSaturate();
    }

    ctx.fillRect(CLOUD_X + MARGIN_SIDE + (GRAPH_WIDTH + GAP_GRAPH) * i, CLOUD_HEIGHT + CLOUD_Y - (MARGIN_HEIGHT + (GRAPH_HEIGHT_MAX * times[i]) / maxTime + FONT_SIZE + fontGap), GRAPH_WIDTH, (GRAPH_HEIGHT_MAX * times[i]) / maxTime);
  };
};
