const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, update, remove } = require('firebase/database');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const firebaseConfig = {
    databaseURL: "https://luckydraw-4b670-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app2 = initializeApp(firebaseConfig);
const database = getDatabase(app2);

app.get('/', (req, res) => {
    get(ref(database, 'nowrandom')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbnowrandom = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbnowrandom.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        result = dbnowrandom
        res.render('index', { result });
    })
});

app.get('/listuser', (req, res) => {
    get(ref(database, 'users')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbuser = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbuser.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        result = dbuser
        get(ref(database, 'prizes')).then((snapshot2) => {
            check = 0, id = 0, i = 0;
            dbprize = [];
            if (snapshot2.val() != null) {
                while (true) {
                    try {
                        if (snapshot2.val()[i] != null) {
                            dbprize.push(snapshot2.val()[i]);
                            check++;
                        }
                    } catch (e) {
                        if (e instanceof ReferenceError) {
                            console.log("ReferenceError");
                        }
                        if (e instanceof TypeError) {
                            console.log("TypeError");
                        }
                    }
                    if (check == Object.keys(snapshot2.val()).length) {
                        break;
                    }
                    i++;
                }
            }
            result2 = dbprize
            get(ref(database, 'nowrandom')).then((snapshot3) => {
                check = 0, id = 0, i = 0;
                dbnowrandom = [];
                if (snapshot3.val() != null) {
                    while (true) {
                        try {
                            if (snapshot3.val()[i] != null) {
                                dbnowrandom.push(snapshot3.val()[i]);
                                check++;
                            }
                        } catch (e) {
                            if (e instanceof ReferenceError) {
                                console.log("ReferenceError");
                            }
                            if (e instanceof TypeError) {
                                console.log("TypeError");
                            }
                        }
                        if (check == Object.keys(snapshot3.val()).length) {
                            break;
                        }
                        i++;
                    }
                }
                result3 = dbnowrandom
                res.render('listuser', { result, result2, result3 });
            })
            
        })
        
    })
});

app.get('/listprize', (req, res) => {
    get(ref(database, 'prizes')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbprize = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbprize.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        result = dbprize
        res.render('listprize', result);
    })
});


app.get('/setotp', (req, res) => {
    res.render('setotp');
});

app.get('/qr', (req, res) => {
    get(ref(database, 'Status')).then((snapshot) => {
        if(snapshot.val().StatusForm == 0){
            res.render('timeoutotp');
        }else{
            res.render('otp');
        }
    });
});

app.get('/getStatusForm', (req, res) => {
    get(ref(database, 'Status')).then((snapshot) => {
        res.send(snapshot);
    })
})
app.put('/UpdateStatusRandom', (req, res) => {
    const { Status } = req.body
    const updatestatus = {};
    updatestatus['Status/' + 'StatusRandom'] = Status;

    update(ref(database), updatestatus)
})
app.put('/UpdateStatusForm', (req, res) => {
    const { Status } = req.body
    const updatestatus = {};
    updatestatus['Status/' + 'StatusForm'] = Status;

    update(ref(database), updatestatus)
})
app.put('/UpdateTime', (req, res) => {
    const { time } = req.body
    const updatestatus = {};
    updatestatus['Status/' + 'Time'] = time;

    update(ref(database), updatestatus)
})


app.post('/addnewuser', (req, res) => {
    const { name, surname, phone, email, codeuser } = req.body;
    get(ref(database, 'users')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        id = snapshot.val()[i].User_id;
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }

        set(ref(database, 'users/' + id.toString()), {
            User_id: id + 1,
            Name: name,
            Surname: surname,
            Phone: phone,
            Email_user: email,
            CodeUser: codeuser,
            Getprize: "",
            UserGet: 0
        })
    })
})
app.get('/getnewuser', (req, res) => {
    get(ref(database, 'users')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbuser = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbuser.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        res.send(JSON.stringify(dbuser));
    })
})
app.put('/updatenewuser', (req, res) => {
    const { user_id, name, surname, phone, email_user, codeuser, getprize, userget } = req.body;
    const updateuser = {};
    updateuser['users/'+ (user_id-1) + '/User_id'] = user_id;
    updateuser['users/'+ (user_id-1) + '/Name']=name;
    updateuser['users/'+ (user_id-1) + '/Surname']=surname;
    updateuser['users/'+ (user_id-1) + '/Phone']=phone;
    updateuser['users/'+ (user_id-1) + '/Email_user']=email_user;
    updateuser['users/'+ (user_id-1) + '/CodeUser']=codeuser;
    updateuser['users/'+ (user_id-1) + '/Getprize']=getprize;
    updateuser['users/'+ (user_id-1) + '/UserGet']=userget;
    
    update(ref(database), updateuser)
    db.query(sql);
})
app.put('/updatenewprizeuser', (req, res) => {
    const { user_id, getprize} = req.body;
    const updateuserprize = {};
    updateuserprize['users/'+ (user_id-1) + '/User_id'] = user_id;
    updateuserprize['users/'+ (user_id-1) + '/Getprize']=getprize;
    
    update(ref(database), updateuserprize)
    db.query(sql);
})
app.delete('/deleteuser', (req, res)=>{
    const { user_id } = req.body;

    remove(ref(database, "users/" + (user_id-1) ));
})


app.post('/addnewprize', (req, res) => {
    const { nameprize, countprize } = req.body;
    get(ref(database, 'prizes')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        id = snapshot.val()[i].Prize_id;
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }

        set(ref(database, 'prizes/' + id.toString()), {
            Prize_id: id + 1,
            Nameprize: nameprize,
            Countprize: countprize,
            Draw: 0,
        })
    })
})
app.post('/addprizeupload', (req, res) => {
    const { nameprize, countprize } = req.body;
    get(ref(database, 'prizes')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        id = snapshot.val()[i].Prize_id;
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }

        for(let i=0;i<nameprize.length;i++) {
            set(ref(database, 'prizes/' + (id + i).toString()), {
                Prize_id: id + 1 + i,
                Nameprize: nameprize[i],
                Countprize: countprize[i],
                Draw: 0,
            })
        }
    })
})
app.get('/getnewprize', (req, res) => {
    get(ref(database, 'prizes')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbprize = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbprize.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        res.send(JSON.stringify(dbprize));
    })
})
app.delete('/deletenewprize', (req, res) => {
    const { prize_id } = req.body
    remove(ref(database, "prizes/" + (prize_id-1) ));
})
app.put('/updatedefaultdrawprize', (req, res) => {
    const { prize_id } = req.body
    
    const updateprize = {};

    updateprize['prizes/'+ (prize_id-1) + '/Draw'] = 0;

    update(ref(database), updateprize)
})
app.put('/updatenewprize', (req, res) => {
    const { prize_id, nameprize, countprize, drawprize } = req.body;
    const updateprize = {};
    updateprize['prizes/'+ (prize_id-1) + '/Prize_id'] = prize_id;
    updateprize['prizes/'+ (prize_id-1) + '/Nameprize']=nameprize;
    updateprize['prizes/'+ (prize_id-1) + '/Countprize']=countprize;
    updateprize['prizes/'+ (prize_id-1) + '/Draw']=drawprize;
    
    update(ref(database), updateprize)
})


app.post('/addnewnowrandom', (req, res) => {
    const { nowprizelist, nowcodelist } = req.body;
    get(ref(database, 'nowrandom')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        id = snapshot.val()[i].Now_id;
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }

        set(ref(database, 'nowrandom/' + id.toString()), {
            Now_id: id + 1,
            NowPrizeList: nowprizelist,
            NowCodeList: nowcodelist,
        })
    })
})
app.get('/getnewnowrandom', (req, res) => {
    get(ref(database, 'nowrandom')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbnowrandom = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbnowrandom.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        res.send(JSON.stringify(dbnowrandom));
    })
})
app.put('/updatenowrandom', (req, res) => {
    const { Now_id, Nowprize} = req.body;
    const updatenowprize = {};
    updatenowprize['nowrandom/'+ (Now_id-1) + '/Now_id'] = Now_id;
    updatenowprize['nowrandom/'+ (Now_id-1) + '/NowPrizeList']=Nowprize;

    update(ref(database), updatenowprize)
})
app.delete('/deletenowrandom', (req, res) => {
    const { nowrandom_id } = req.body;

    remove(ref(database, "nowrandom/" + (nowrandom_id-1) ))
})


app.post('/addnewnownothere', (req, res) => {
    const { codenownothere } = req.body;
    get(ref(database, 'nownothere')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        id = snapshot.val()[i].NowNotHere_id;
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }

        set(ref(database, 'nownothere/' + id.toString()), {
            NowNotHere_id: id + 1,
            CodeNotHere: codenownothere,
        })
    })
})
app.get('/getnewnownothere', (req, res) => {
    get(ref(database, 'nownothere')).then((snapshot) => {
        check = 0, id = 0, i = 0;
        dbnownothere = [];
        if (snapshot.val() != null) {
            while (true) {
                try {
                    if (snapshot.val()[i] != null) {
                        dbnownothere.push(snapshot.val()[i]);
                        check++;
                    }
                } catch (e) {
                    if (e instanceof ReferenceError) {
                        console.log("ReferenceError");
                    }
                    if (e instanceof TypeError) {
                        console.log("TypeError");
                    }
                }
                if (check == Object.keys(snapshot.val()).length) {
                    break;
                }
                i++;
            }
        }
        res.send(JSON.stringify(dbnownothere));
    })
})
app.delete('/deletenewnothere', (req, res) => {
    const { codenothere_id } = req.body;
    
    remove(ref(database, "nownothere/" + (codenothere_id-1) ));
})