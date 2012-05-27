var assert = require('assert');

var spellCorrector = require('../index');

var dictionary1 = ['delete', 'remove', 'upgrade', 'destroy', 'list'];

exports['test_get_levenshtein_distance'] = function(test, assert) {
  var words = [
    ['kitten', 'sitting'],
    [ 'saturday', 'sunday'],
    [ 'foo', 'fuu'],
    [ 'foobar', ''],
    [ 'world', 'world' ],
    [ 'kate', 'cats'],
    [ 'word', 'world' ],
    [ 'mega', 'cool' ],
    [ 'meet', 'met' ]
  ];

  var distances = [
    3,
    3,
    2,
    6,
    0,
    2,
    1,
    4,
    1
  ];

  var words_len = words.length;
  for (var i = 0; i < words_len; i++) {
    assert.equal(spellCorrector.getLevenshteinDistance(words[i][0], words[i][1]), distances[i]);
  }

  test.finish();
};

exports['test_get_candidates_no_max_distance'] = function(test, assert) {
  var candidates = spellCorrector.getCandidates('del', dictionary1, null);

  assert.equal(Object.keys(candidates).length, 5);
  test.finish();
};

exports['test_get_candidates_with_max_distance'] = function(test, assert) {
  var candidates1 = spellCorrector.getCandidates('del', dictionary1, 3);
  var candidates2 = spellCorrector.getCandidates('foobar', dictionary1, 2);

  assert.equal(Object.keys(candidates1).length, 1);
  assert.equal(Object.keys(candidates2).length, 0);
  test.finish();
};

exports['test_get_correction_no_max_distance'] = function(test, assert) {
  var correction1 = spellCorrector.getCorrection('del', dictionary1, null);
  var correction2 = spellCorrector.getCorrection('delete', dictionary1, null);

  assert.equal(correction1, 'delete');
  assert.equal(correction2, 'delete');
  test.finish();
};

exports['test_get_correction_with_max_distance'] = function(test, assert) {
  var correction1 = spellCorrector.getCorrection('del', dictionary1, 1);
  var correction2 = spellCorrector.getCorrection('delete', dictionary1, 1);

  assert.equal(correction1, null);
  assert.equal(correction2, 'delete');
  test.finish();
};
