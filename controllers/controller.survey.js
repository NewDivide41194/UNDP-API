const { surveyService } = require("../services");
const response = require("../response/response");
var groupArray = require("group-array");
const moment = require("moment");
const GetSection = (req, res, next) => {
  const surveyHeaderId = req.params.surveyHeaderId;
  surveyService
    .getSection(surveyHeaderId)
    .then((data) => {
      res.json(
        response({
          success: true,
          message: "Success",
          payload: data,
        })
      );
    })
    .catch((err) =>
      // next(err)
      res.json(response({ success: false, message: "Error!", error: err }))
    );
};

const getQuestion = (req, res) => {
  let userId = req.query.userId;
  const surveyHeaderId = req.query.surveyHeaderId;
  const surveySectionId = req.query.surveySectionId;
  const countryId = req.query.countryId;
  let count = 0;

  surveyService
    .getQuestion(userId, countryId, surveyHeaderId, surveySectionId)
    .then((data) => {
      const surveySections = Object.keys(
        groupArray(data[0], "survey_section_id")
      ).map((v, k) => {
        return groupArray(data[0], "survey_section_id")[v];
      });
      let ans = [
        {
          survey_header_id: surveySections[0][0].survey_header_id,
          survey_name: surveySections[0][0].survey_name,
          survey_sections: surveySections.map((section) => {
            count += Object.keys(
              groupArray(section, "primary_question")
            ).length;
            return {
              survey_section_id: section[0].survey_section_id,
              section_name: section[0].section_name,
              questions: Object.keys(groupArray(section, "primary_question"))
                .map((v, k) => {
                  return groupArray(section, "primary_question")[v];
                })
                .map((v1, k1) => {
                  if (v1[0].sub_question_id == null) {
                    return {
                      question_id: v1[0].primary_question,
                      question_name: v1[0].question_name,
                      input_type_id: v1[0].input_types_id,
                      label:
                        v1[0].label !== null
                          ? Object.keys(groupArray(v1, "label")).map((x, y) => {
                              return { label_no: y + 1, label_name: x };
                            })
                          : undefined,
                      option_group_id: v1[0].option_groups_id,
                      key: v1[0].question_key,
                      option_choices: v1.map((c) => {
                        return {
                          option_choice_id: c.choices_id,
                          option_choice_name: c.choices,
                        };
                      }),
                    };
                  } else if (v1[0].choices_id == null) {
                    const dataResult1 = [];

                    v1.map((c) => {
                      const index = dataResult1.find(
                        (v) => v.option_choice_id == c.oc
                      );
                      if (index == null || index == undefined) {
                        dataResult1.push({
                          option_choice_id: c.oc,
                          categories: c.cat,
                        });
                      }
                    });
                    return {
                      question_id: v1[0].primary_question,
                      question_name: v1[0].question_name,
                      input_type_id: v1[0].input_types_id,
                      label:
                        v1[0].label !== null
                          ? Object.keys(groupArray(v1, "label")).map((x, y) => {
                              return { label_no: y + 1, label_name: x };
                            })
                          : undefined,
                      option_group_id: v1[0].option_groups_id,
                      key: v1[0].question_key,
                      categories:
                        dataResult1.filter(
                          (v) => v.option_choice_name != null
                        ) == ""
                          ? null
                          : dataResult1.filter(
                              (v) => v.option_choice_name != null
                            ),
                      sub_questions: Object.keys(
                        groupArray(v1, "sub_question_id")
                      )
                        .map((v2, k2) => {
                          return groupArray(v1, "sub_question_id")[v2];
                        })
                        .map((v3, k3) => {
                          const dataResult = [];
                          v3.map((c) => {
                            const index = dataResult.find(
                              (v) => v.option_choice_id == c.oc
                            );
                            if (index == null || index == undefined) {
                              dataResult.push({
                                option_choice_id: c.oc,
                                option_choice_name: c.option_choice_name,
                              });
                            }
                          });
                          return {
                            sub_question_id: v3[0].sub_question_id,
                            sub_question_name: v3[0].sub_question_name,
                            input_type_id: v3[0].input_type_id,
                            option_group_id: v3[0].option_group_id,
                            option_choices: dataResult.filter(
                              (v) => v.option_choice_name != null
                            ),
                          };
                        }),
                    };
                  } else {
                    const dataResult = [];
                    const dataResult1 = [];

                    v1.map((c) => {
                      const index = dataResult.find(
                        (v) => v.option_choice_id == c.choices_id
                      );
                      if (index == null || index == undefined) {
                        dataResult.push({
                          option_choice_id: c.choices_id,
                          option_choice_name: c.choices,
                        });
                      }
                    }),
                      v1.map((c) => {
                        const index = dataResult1.find(
                          (v) => v.option_choice_id == c.choices_id
                        );
                        if (index == null || index == undefined) {
                          dataResult1.push({
                            option_choice_id: c.choices_id,
                            categories: c.categories,
                          });
                        }
                      });
                    return {
                      question_id: v1[0].primary_question,
                      question_name: v1[0].question_name,
                      input_type_id: v1[0].input_types_id,
                      label:
                        v1[0].label !== null
                          ? Object.keys(groupArray(v1, "label")).map((x, y) => {
                              return { label_no: y + 1, label_name: x };
                            })
                          : undefined,
                      option_group_id: v1[0].option_groups_id,
                      key: v1[0].question_key,
                      categories: dataResult1.filter(
                        (c) => c.categories != null
                      ),
                      option_choices: dataResult.filter(
                        (c) => c.option_choice_name != null
                      ),
                      sub_questions: Object.keys(
                        groupArray(v1, "sub_question_id")
                      )
                        .map((v2, k2) => {
                          return groupArray(v1, "sub_question_id")[v2];
                        })
                        .map((v3, k3) => {
                          const dataResult = [];
                          v1.map((c) => {
                            const index = dataResult.find(
                              (v) => v.option_choice_id == c.oc
                            );
                            if (index == null || index == undefined) {
                              dataResult.push({
                                option_choice_id: c.oc,
                                option_choice_name: c.option_choice_name,
                              });
                            }
                          });
                          return {
                            sub_question_id: v3[0].sub_question_id,
                            sub_question_name: v3[0].sub_question_name,
                            input_type_id: v3[0].input_type_id,
                            option_group_id: v3[0].option_group_id,
                            option_choices: dataResult.filter(
                              (c) => c.option_choice_name != null
                            ),
                          };
                        }),
                    };
                  }
                }),
            };
          }),
          question_count: count,
          answers: data[1],
        },
      ];

      res.json(response({ success: true, payload: ans }));
    })
    .catch((err) =>
      res.json(response({ success: false, message: err.toString() }))
    );
};

const addAnswer = (req, res) => {
  let targetCount = req.body.data.length;
  let count = 0;
  let queryLoop = new Promise((resolve, reject) => {
    surveyService
      .deleteAnswer(
        req.body.data[0].userId,
        req.body.data[0].survey_header_id,
        // req.body.data[0].building_id,
        req.body.data[0].countryId,
        req.body.data[0].surveySectionId
      )
      .then(
        req.body.data
          .map(async (data) => {
            let optionChoiceId = data.optionChoiceId;
            let other = data.other;
            let userId = data.userId;
            let questionId = data.questionId;
            let survey_headers_id = data.survey_header_id;
            // let building_id = data.building_id;
            let keyValue = data.keyValue;
            // let answeredDate = moment
            //   .utc(new Date())
            //   .local()
            //   .format("YYYY-MM-DD HH:mm:ss");
            // let totalQuestionCount = req.body.total;
            // let buildingType = req.body.buildingType;
            let countryId = data.countryId;
            let subQuestionId = data.subQuestionId;
            let surveySectionId = data.surveySectionId;
            try {
              let addData = await surveyService.addAnswer(
                other,
                optionChoiceId,
                userId,
                questionId,
                survey_headers_id,
                keyValue,
                // totalQuestionCount,
                // answeredDate,
                countryId,
                subQuestionId,
                surveySectionId
              );
              count++;
              if (count == targetCount) resolve({ answeredCount: count });
            } catch (error) {
              res.json(response({ success: false, error: error }));
            }
          })
          .catch((err) => console.log(err))
      );
  });

  queryLoop
    .then((data) => {
      res.json(response({ success: true, payload: data }));
    })
    .catch((err) =>
      res.json(response({ success: false, message: err.toString() }))
    );
};

module.exports = { GetSection, getQuestion, addAnswer };
