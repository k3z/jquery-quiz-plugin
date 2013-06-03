;(function ( $, window, document, undefined ) {

    // Requires doT js template engine

    var pluginName = "j20Quizz",
        defaults = {
            store: 'store/quiz.php',
            quizOutletId: '#quiz',
            quizStartOutletId: '#quiz-start',
            quizEndOutletId: '#quiz-end',
            quizBillboardOutletId: '#quiz-billboard',
            templateId: '#quiztmpl',
            templateFn: null,
            data: {},
            session: [],
            currentQuiz: 'quiz1',
            questionIndex: 0
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var _this = this;

            // compile doT template
            this.options.templateFn = doT.template($(this.options.templateId).text());

            // load quiz data
            $.getJSON(this.options.store+'?load=true&quiz='+this.options.currentQuiz, function(data) {

                _this.options.data = data.quiz;
                _this.options.session = data.session;

                // set previous answers if exist
                if (_this.options.session) {

                    $.each(_this.options.data.questions, function(i, question) {

                        if (_this.options.session[i]) {

                            question.playerAnswer = _this.options.session[i].answer;

                        }

                    });

                }

                if (_this.options.questionIndex > 0) {

                    $('#quiz').show();

                } else {

                    $(_this.options.quizStartOutletId).show();
                }

                // init buttons
                if (_this.options.session) {

                    if (
                        _this.options.session.length > 0 &&
                        _this.options.session.length < _this.options.data.questions.length
                        ) {

                        _this.options.questionIndex = _this.options.session.length;
                        $('#quiz-start-go').text('Continue Quiz');

                    }

                }

                $('#quiz-start-go').click(function() {

                    _this.showQuestion(_this.options.questionIndex);

                    $(_this.options.quizStartOutletId).hide();
                    $('#quiz').show();

                });

                _this.renderBillboard();

            });

        },


        renderBillboard: function() {
            var _this = this;

            $(_this.options.quizBillboardOutletId+' ul').empty();
            $.each(this.options.data.questions, function(i, question) {

                var is_correct = null;

                // check current response
                if (question.playerAnswer !== undefined) {

                    is_correct =
                        (question.playerAnswer == question.correct_answer ? true : false);

                }

                $(_this.options.quizBillboardOutletId+' ul').append(
                    '<li>'+question.label+' : '+ ( is_correct ) +'</li>'
                );

            });


        },


        showQuestion: function(questionIndex) {
            var _this = this;
            var question = this.options.data.questions[questionIndex];

            // check previous answer
            $.each(question.choices, function(i, choice) {

                choice.check = false;
                if (i == question.playerAnswer) {
                    choice.check = true;
                }

            });

            var data = {
                'label': this.options.data.label,
                'question': question
            };

            $(this.options.quizOutletId).html(
                this.options.templateFn(data)
            );

            // init buttons behaviour
            $('#quiz-next-question').unbind('click').click(function() {

                _this.nextQuestion();

            });
            $('#quiz-restart').unbind('click').click(function() {

                _this.restart();

            });

            if ((questionIndex+1) == this.options.data.questions.length) {

                $('#quiz-next-question').text('Finnish');
            };

        },


        getPlayerAnswer: function() {

            return $('input[name=choice]:checked', $(this.options.quizOutletId)).val();

        },


        save: function(callback) {
            var _this = this;

            $.post(
                this.options.store,
                {
                    save: true,
                    quiz: this.options.currentQuiz,
                    question: this.options.questionIndex,
                    player_answer: this.options.data.questions[this.options.questionIndex].playerAnswer
                },
                function() {
                    callback();
                }
            );

        },


        nextQuestion: function() {
            var _this = this;
            var playerAnswer = this.getPlayerAnswer();

            if (playerAnswer !== undefined) {

                // store response in questions object and update billboard
                this.options.data.questions[this.options.questionIndex].playerAnswer = playerAnswer;
                this.renderBillboard();

                // save user response before next step
                this.save(function() {

                    _this.options.questionIndex++;
                    if (_this.options.questionIndex < _this.options.data.questions.length) {

                        _this.showQuestion(_this.options.questionIndex);
                        return;
                    }
                    _this.finished();
                });

                return;
            }
            /* debug */ try { console.log('You must answer the question') } catch (e) { null } ;

        },


        restart: function() {

            // reset player answers
            $.each(this.options.data.questions, function(i, question) {

                question.playerAnswer = undefined;

            });
            this.renderBillboard();

            this.options.questionIndex = 0;
            $(this.options.quizStartOutletId).show();
            $(this.options.quizOutletId).hide();
            $(this.options.quizEndOutletId).hide();

        },


        finished: function() {

            this.options.questionIndex = 0;
            $(this.options.quizStartOutletId).hide();
            $(this.options.quizOutletId).hide();
            $(this.options.quizEndOutletId).show();

        }

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );