'use strict';
var fs = require('fs');
require('shelljs/global');
const chalk = require('chalk');

class RulesEngine {

    constructor(rules_path, corpus) {
        this.rules = JSON.parse(fs.readFileSync(rules_path).toString());
        this.corpus = corpus;
        return this.processRules();
    }

    processRules() {
        for (let i = 0; i < this.rules.length; i++) {
            if (this.getRuleResult(this.rules[i])) {
                console.log("Rules matched for: " + this.rules[i]['id'])
                return this.rules[i];
            }
        }
    }

    getRuleResult(rule) {
        console.log("Checking Rules: ", rule['rules']);
        for (var ruleType in rule['rules']) {
            console.log("RuleType is: ", ruleType);
            var rules = rule['rules'][ruleType];
            switch (ruleType) {
                case "and": return this.andRules(rules);
                case "or": return this.orRules(rules);
                case "not": return this.notRules(rules);
                case "match": return this.matchRules(rules);
                default: return false;
            }

        }
    }

    andRules(rules) {
        for (let i = 0; i < rules.length; i++) {
            console.log("AND RULES: ", rules[i]);
            var result = this.matchRule(rules[i]['match']);
            if (!result) {
                return false;
            }
        }
        return true;
    }

    orRules(rules) {
        for (let i = 0; i < rules.length; i++) {
            var result = this.matchRule(rules[i]['match']);
            if (result) {
                return true;
            }
        }
        return false;
    }

    notRules(rules) {
        for (let i = 0; i < rules.length; i++) {
            var result = this.matchRule(rules[i]['match']);
            if (result) {
                return false;
            }
        }
        return true;
    }

    matchRule(matchRule) {
        switch (matchRule['type']) {
            case 'value': return this.doesValueMatch(matchRule['value']);
            case 'regex': return this.doesRegexMatch(matchRule);
            default: this.exitOnError("NO RULE TYPE MATCH!");
        }
    }

    doesValueMatch(value) {
        return this.corpus.indexOf(value) !== -1;
    }

    doesRegexMatch(regex) {
        var re = new RegExp(regex['regex']);
        if (re.test(this.corpus)) {
            if (regex.hasOwnProperty('name')) {
                var group = regex['group'];
                var res = new Object;
                res['matched'] = true;
                var result = this.corpus.match(re)[group];
                res[regex['name']] = result;
                
                return res;
            }
        }

        return { 'matched': false };
    }

}


module.exports = RulesEngine;
