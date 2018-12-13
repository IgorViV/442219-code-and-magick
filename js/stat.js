'use strict';

(function () {
  var fontGap = Math.round(window.data.fontSizeCloud * 1.0);// межстрочный интервал
  var currentFont = window.data.fontSizeCloud + 'px ' + window.data.fontFamilyCloud;// текущий шрифт

  // Функция для отрисовки окна с тенью:
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, window.data.widthCloud, window.data.heightCloud);
  };

  // Расчет максимального значения в массиве:
  // var getMaxElement = function (arr) {

  //   return Math.max.apply(null, arr);
  // };

  window.renderStatistics = function (ctx, names, times) {
    // Рисуем окно вывода результатов:
    renderCloud(ctx, window.data.xCloud + window.data.gapShadowCloud, window.data.yCloud + window.data.gapShadowCloud, window.data.colorCloud);
    renderCloud(ctx, window.data.xCloud, window.data.yCloud, window.data.colorShadowCloud);

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

    drawTitleCloud(ctx, window.data.textTitleCloud, window.data.xCloud + window.data.widthCloud / 2, window.data.yCloud + window.data.marginHeightCloud * 1.5, window.data.widthCloud - window.data.marginSideCloud * 7, fontGap);

    // Проверяем равенство массивов names и times:
    if (names.length > times.length) {
      times.push(0);
    } else if (names.length < times.length) {
      names.push('Инкогнито');
    }

    // Считаем максимальное время игроков:
    var maxTime = Math.round(window.util.getMaxElement(times));

    // Функция для выбора случайной насыщенности цвета столбцов гистограммы:
    var getRandomSaturate = function () {
      return 'hsla(240, ' + window.util.randomNumber(100) + '%, 50%, 1)';
    };

    // Расчет ширины гистограммы и боковых полей для центровки гистограммы:
    var widthHistogram = (window.data.widthGraphCloud + window.data.gapGraphCloud) * names.length;
    var paddingHistogram = (window.data.widthCloud - widthHistogram) / 2;

    // Функция расчета координаты X колонки:
    var coordinateGraphX = function (indexGraph) {
      var coordinateX = window.data.xCloud + window.data.marginSideCloud + paddingHistogram;
      coordinateX += (window.data.widthGraphCloud + window.data.gapGraphCloud) * indexGraph;

      return coordinateX;
    };

    // Функция расчета координаты Y колонки:
    var coordinateGraphY = function (maxGraph, arrTimes, indexTimes) {
      var coordinateY = (window.data.heightCloud + window.data.yCloud) - (window.data.marginHeightCloud + window.data.fontSizeCloud) - (window.data.heightGraphCloud * arrTimes[indexTimes]) / maxGraph;

      return coordinateY;
    };

    // Строим гистограмму:
    for (var i = 0; i < names.length; i++) {

      ctx.fillStyle = '#000';
      ctx.textBaseline = 'handing';
      ctx.textAlign = 'start';
      ctx.fillText(Math.round(times[i]), coordinateGraphX(i), coordinateGraphY(maxTime, times, i) - fontGap);
      ctx.fillText(names[i], coordinateGraphX(i), window.data.heightCloud + window.data.yCloud - window.data.marginHeightCloud);

      // Устанавливаем цвет колонок:
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = getRandomSaturate();
      }

      ctx.fillRect(coordinateGraphX(i), coordinateGraphY(maxTime, times, i), window.data.widthGraphCloud, (window.data.heightGraphCloud * times[i] / maxTime));
    }
  };
})();

