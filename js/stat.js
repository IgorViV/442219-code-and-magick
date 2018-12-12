'use strict';

var CLOUD_WIDTH = 420;// ширина облака
var CLOUD_HEIGHT = 270;// высота облака
var CLOUD_X = 100;// начальная координата облака по горизонтали
var CLOUD_Y = 10;// начальная координата облака по вертикали
var GAP_SHADOW = 10;// смещение тени облака
var GAP_GRAPH = 50;// расстояние между колонками
var GRAPH_WIDTH = 40;// ширина колонок
var GRAPH_HEIGHT_MAX = 150;// максимальная высота колонки
var MARGIN_SIDE = 30;// поля по бокам
var MARGIN_HEIGHT = 15;// поля сверху и снизу
var FONT_SIZE = 16;// размер шрифта
var FONT_FAMILY = 'PT Mono';// семейство шрифтов
var TITLE_CLOUD = 'Ура Вы победили! Список результатов:'; // заголовок окна результатов
var fontGap = Math.round(FONT_SIZE * 1.0);// межстрочный интервал
var currentFont = FONT_SIZE + 'px ' + FONT_FAMILY;// текущий шрифт

// Функция для отрисовки окна с тенью:
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Расчет максимального значения параметра:
var getMaxElement = function (arr) {

  return Math.max.apply(null, arr);
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно вывода результатов:
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Пишем заголовок окна вывода результатов:
  var drawTitleCloud = function (context, text, marginLeft, marginTop, maxWidth, lineHeight) {
    var words = text.split(' ');
    var countWords = words.length;
    var line = '';
    context.textAlign = 'center';
    for (var i = 0; i < countWords; i++) {
      var testLine = line + words[i] + ' ';
      var testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth) {
        context.fillText(line, marginLeft, marginTop);
        line = words[i] + ' ';
        marginTop += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, marginLeft, marginTop);
  };

  ctx.fillStyle = '#000';
  ctx.font = currentFont;
  ctx.textBaseline = 'handing';

  drawTitleCloud(ctx, TITLE_CLOUD, CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + MARGIN_HEIGHT * 1.5, CLOUD_WIDTH - MARGIN_SIDE * 7, fontGap);

  // Проверяем равенство массивов names и times:
  if (names.length > times.length) {
    times.push(0);
  } else if (names.length < times.length) {
    names.push('Инкогнито');
  }

  // Считаем максимальное время игроков:
  var maxTime = Math.round(getMaxElement(times));

  // Функция для выбора случайной насыщенности цвета столбцов гистограммы:
  var getRandomSaturate = function () {
    var saturate = Math.floor(Math.random() * 101);

    return 'hsla(240, ' + saturate + '%, 50%, 1)';
  };

  // Расчет ширины гистограммы и боковых полей для центровки гистограммы:
  var widthHistogram = (GRAPH_WIDTH + GAP_GRAPH) * names.length;
  var paddingHistogram = (CLOUD_WIDTH - widthHistogram) / 2;

  // Функция расчета координаты X колонки:
  var coordinateGraphX = function (indexGraph) {
    var coordinateX = CLOUD_X + MARGIN_SIDE + paddingHistogram;
    coordinateX += (GRAPH_WIDTH + GAP_GRAPH) * indexGraph;

    return coordinateX;
  };

  // Функция расчета координаты Y колонки:
  var coordinateGraphY = function (maxGraph, arrTimes, indexTimes) {
    var coordinateY = (CLOUD_HEIGHT + CLOUD_Y) - (MARGIN_HEIGHT + FONT_SIZE) - (GRAPH_HEIGHT_MAX * arrTimes[indexTimes]) / maxGraph;

    return coordinateY;
  };

  // Строим гистограмму:
  for (var i = 0; i < names.length; i++) {

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'handing';
    ctx.textAlign = 'start';
    ctx.fillText(Math.round(times[i]), coordinateGraphX(i), coordinateGraphY(maxTime, times, i) - fontGap);
    ctx.fillText(names[i], coordinateGraphX(i), CLOUD_HEIGHT + CLOUD_Y - MARGIN_HEIGHT);

    // Устанавливаем цвет колонок:
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomSaturate();
    }

    ctx.fillRect(coordinateGraphX(i), coordinateGraphY(maxTime, times, i), GRAPH_WIDTH, (GRAPH_HEIGHT_MAX * times[i] / maxTime));
  }
};
