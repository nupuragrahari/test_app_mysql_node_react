/* jshint loopfunc:true */
(function(mainController) {

    var _ = require("underscore");
    var db = require('./../config/db');

    mainController.init = function(app) {

        exports.renderIndex = function(req, res) {
            res.render('index', { title: 'Express' });
        };

        exports.getLocations =function (req,res) {
            console.log("hit");
            let query = 'SELECT * FROM battles';
            db.query(query,function (error, response) {
                if(error){
                    console.log(error)
                } else if(response){

                    let locations =[];
                    _.each(response,function (obj) {
                        locations.push(obj.location)
                    });
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(JSON.stringify(locations, null, 3));
                }

            })
        };

        exports.getNumberOfBattles =function (req,res) {
            let query = 'SELECT * FROM battles';
            db.query(query,function (error, response) {
                if(error){
                    console.log(error)
                } else if(response){
                    let numberOfBattles=response.length;
                    res.status(200).send(JSON.stringify(numberOfBattles, null, 3));
                }

            })
        };

        exports.getStats = function (req,res) {
            let query = 'SELECT * FROM battles';
            db.query(query,function (error, response) {
                if(error){
                    console.log(error)
                } else if(response){
                    let all_attacker_kings=[],all_defender_kings=[],all_regions=[],all_attacker_outcomes=[],all_battle_types=[],all_defender_sizes=[];
                    let most_active_attacker_king,most_active_defender_king,most_active_region,numberOfWins,numberOfLosses,name;

                    _.each(response,function (battle) {
                        all_attacker_kings.push(battle.attacker_king);
                        all_defender_kings.push(battle.defender_king);
                        all_regions.push(battle.region);
                        all_attacker_outcomes.push(battle.attacker_outcome);
                        all_battle_types.push(battle.battle_type);
                        all_defender_sizes.push(battle.defender_size);
                        name= battle.name
                    });

                    _.each(all_attacker_kings,function (ak) {
                        let count=0;
                        let result = all_attacker_kings.filter(word => word===ak).length;
                        if(count<result){
                            count=result;
                            most_active_attacker_king=ak
                        }
                    });
                    _.each(all_defender_kings,function (ak) {
                        let count=0;
                        let result = all_defender_kings.filter(word => word===ak).length;
                        if(count<result){
                            count=result;
                            most_active_defender_king=ak
                        }
                    });
                    _.each(all_regions,function (ak) {
                        let count=0;
                        let result = all_regions.filter(word => word===ak).length;
                        if(count<result){
                            count=result;
                            most_active_region=ak
                        }
                    });
                    numberOfWins=all_attacker_outcomes.filter(word => word==="win").length;
                    numberOfLosses=all_attacker_outcomes.filter(word => word==="loss").length;

                    let battle_types = _.uniq(all_battle_types);
                    const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
                    let data ={
                        'most_active':{
                            'attacker_king':most_active_attacker_king,
                            'defender_king':most_active_defender_king,
                            'region':most_active_region,
                            'name':name
                        },
                        'attacker_outcome':{
                            'win':numberOfWins, // total win
                            'loss':numberOfLosses // total loss
                        },
                        'battle_type':battle_types, // unique battle types
                        'defender_size':{
                            'average':average(all_defender_sizes),
                            'min':_.min(all_defender_sizes,function (i) {
                                if(i!==""){
                                    return i
                                }
                            }),
                            'max':_.max(all_defender_sizes)
                        }
                    };

                    res.status(200).send(JSON.stringify(data, null, 3));
                }

            })
        };
        
        exports.searchData = function (req,res) {
            let query = 'SELECT * FROM battles';
            db.query(query,function (error, response) {
                if(error){
                    console.log(error)
                } else if(response){
                    function searchValues(needle) {
                        let found = [];
                        let re = new RegExp(needle, 'i');
                        response.forEach(function(item, ix) {
                            Object.keys(item).forEach(function(key) {
                                if (typeof item[key] !== 'string') return;
                                if (item[key].match(re)) {
                                    if (found.indexOf(ix) === -1) { found.push(ix); }
                                }
                            });
                        });
                        return {searched: needle, indexes:found};
                    }


                    let tests = req.body.words;


                    let found = tests.map(searchValues);
                    console.log(JSON.stringify(found, null, 2) + '\n');
                    res.status(200).send(JSON.stringify(found, null, 3));
                }

            })

        }
    };
})(module.exports);
