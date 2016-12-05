'use strict';
var fs = require('fs');

class RulesEngine {

    constructor(rules_path, corpus) {
        this.rules = JSON.parse(fs.readFileSync(rules_path).toString());
        this.corpus = corpus;
        this.loadRules();
    }

    loadRules() {
        for (let i = 0; i < this.rules.length; i++) {
            console.log("IN LOAD RULES: ", this.rules[i]['rules']);
            for (var ruleType in this.rules[i]['rules']) {
                var rules = this.rules[i]['rules'][ruleType];
                switch(ruleType){
                    case "and": this.andRules(rules); break;
                    case "or": this.orRules(rules); break;
                    case "not": this.notRules(rules); break;
                    case "match": this.matchRules(rules); break;
                    default: console.log("NO RULE TYPE MATCH!");
                }
            }
        }
    }

    andRules(rules){
        for(let i=0; i<rules.length; i++){
            console.log("AND RULES: ", rules[i]);
            var result = this.matchRule(rules[i]['match']);
            if(!result){
                echo("Rules failure, rule: " + rules[i]['match'] + " did not match!");
                exit(1);
            }
            console.log("AND RULES RESULT: ", result);
        }
    }

    matchRule(matchRule){
        switch(matchRule['type']){
            case 'value': return this.doesValueMatch(matchRule['value']); break;
            case 'regex': return this.doesRegexMatch(matchRule['regex']); break;
            default: console.log("NO RULE TYPE MATCH!");
        }
    }

    doesValueMatch(value) {
        return this.corpus.indexOf(value) !== -1;
    }

    doesRegexMatch(regex) {
        var re = new RegExp(regex);
        return re.test(this.corpus);
    }

}


module.exports = RulesEngine;
