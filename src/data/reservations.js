const RESERVATIONS = {
    result: [{
        themeId: 1,
        themeNameKo: "제3표류도",
        themeNameEn: "The Third-Drift Island",
        mainImagePath: "https://xcape-business-sdk-uploads.s3.ap-northeast-2.amazonaws.com/1/5308b5e2-a7a9-4137-92a8-cb6bfed299ba_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202023-03-13%2018.22.22.png",
        minParticipant: 2,
        maxParticipant: 6,
        difficulty: 2,
        priceDtoList: [{
            id: 23, person: 2, price: 20000, type: "openRoom", themeId: 1, useYn: true
        }, {id: 24, "person": 3, "price": 30000, "type": "openRoom", "themeId": 1, "useYn": true}, {
            id: 25, person: 4, price: 40000, type: "openRoom", themeId: 1, useYn: true
        }, {id: 26, "person": 5, "price": 50000, "type": "openRoom", "themeId": 1, "useYn": true}, {
            id: 27, person: 6, price: 60000, type: "openRoom", themeId: 1, useYn: true
        }, {id: 28, "person": 2, "price": 20000, "type": "general", "themeId": 1, "useYn": true}, {
            id: 29, person: 3, price: 30000, type: "general", themeId: 1, useYn: true
        }, {id: 30, "person": 4, "price": 40000, "type": "general", "themeId": 1, "useYn": true}, {
            id: 31, person: 5, price: 50000, type: "general", themeId: 1, useYn: true
        }, {id: 32, "person": 6, "price": 60000, "type": "general", "themeId": 1, "useYn": true}, {
            id: 38, person: 7, price: 10000000, type: "openRoom", themeId: 1, useYn: true
        }, {id: 39, "person": 7, "price": 10000, "type": "general", "themeId": 1, "useYn": true}, {
            id: 40, person: 7, price: 10000000, type: "openRoom", themeId: 1, useYn: true
        }, {id: 41, "person": 7, "price": 10000, "type": "general", "themeId": 1, "useYn": true}, {
            id: 42, person: 8, price: 0, type: "openRoom", themeId: 1, useYn: true
        }, {id: 43, "person": 8, "price": 0, "type": "general", "themeId": 1, "useYn": true}, {
            id: 44, person: 8, price: 233, type: "general", themeId: 1, useYn: true
        }],
        reservationDtos: []
    }, {
        themeId: 2,
        themeNameKo: "기억의 틈",
        themeNameEn: "Gap in Memory",
        mainImagePath: null,
        minParticipant: 2,
        maxParticipant: 7,
        difficulty: 3,
        priceDtoList: [{
            id: 1, person: 2, price: 20000, type: "openRoom", themeId: 2, useYn: true
        }, {id: 2, "person": 3, "price": 20000, "type": "openRoom", "themeId": 2, "useYn": true}, {
            id: 3, person: 4, price: 30000, type: "openRoom", themeId: 2, useYn: true
        }, {id: 4, "person": 5, "price": 30000, "type": "openRoom", "themeId": 2, "useYn": true}, {
            id: 5, person: 6, price: 40000, type: "openRoom", themeId: 2, useYn: true
        }, {id: 6, "person": 2, "price": 22000000, "type": "general", "themeId": 2, "useYn": true}, {
            id: 7, person: 3, price: 300000, type: "general", themeId: 2, useYn: true
        }, {id: 8, "person": 4, "price": 400000, "type": "general", "themeId": 2, "useYn": true}, {
            id: 9, person: 5, price: 400000, type: "general", themeId: 2, useYn: true
        }, {id: 10, "person": 6, "price": 500000, "type": "general", "themeId": 2, "useYn": true}, {
            id: 11, person: 7, price: 50000, type: "openRoom", themeId: 2, useYn: true
        }, {id: 12, "person": 7, "price": 600000, "type": "general", "themeId": 2, "useYn": true}, {
            id: 33, person: 1, price: 10000, type: "general", themeId: 2, useYn: true
        }],
        "reservationDtos": []
    }, {
        "themeId": 3,
        "themeNameKo": "수취인초대",
        "themeNameEn": "Receiver Invitation",
        "mainImagePath": null,
        "minParticipant": 2,
        "maxParticipant": 6,
        "difficulty": 4,
        "priceDtoList": [{
            "id": 13, "person": 2, "price": 20000, "type": "openRoom", "themeId": 3, "useYn": true
        }, {"id": 14, "person": 3, "price": 20000, "type": "openRoom", "themeId": 3, "useYn": true}, {
            "id": 15, "person": 4, "price": 30000, "type": "openRoom", "themeId": 3, "useYn": true
        }, {"id": 16, "person": 5, "price": 30000, "type": "openRoom", "themeId": 3, "useYn": true}, {
            "id": 17, "person": 6, "price": 40000, "type": "openRoom", "themeId": 3, "useYn": true
        }, {"id": 18, "person": 2, "price": 300000, "type": "general", "themeId": 3, "useYn": true}, {
            "id": 19, "person": 3, "price": 300000, "type": "general", "themeId": 3, "useYn": true
        }, {"id": 20, "person": 4, "price": 400000, "type": "general", "themeId": 3, "useYn": true}, {
            "id": 21, "person": 5, "price": 400000, "type": "general", "themeId": 3, "useYn": true
        }, {"id": 22, "person": 6, "price": 500000, "type": "general", "themeId": 3, "useYn": true}],
        "reservationDtos": []
    }, {
        "themeId": 4,
        "themeNameKo": "제5수감동",
        "themeNameEn": "No.5-PRISON",
        "mainImagePath": null,
        "minParticipant": 1,
        "maxParticipant": 6,
        "difficulty": 2,
        "priceDtoList": [{
            "id": 34, "person": 2, "price": 2000, "type": "general", "themeId": 4, "useYn": true
        }, {"id": 35, "person": 1, "price": 1000, "type": "general", "themeId": 4, "useYn": true}, {
            "id": 36, "person": 2, "price": 5000, "type": "openRoom", "themeId": 4, "useYn": true
        }, {"id": 37, "person": 1, "price": 1000, "type": "openRoom", "themeId": 4, "useYn": false}],
        "reservationDtos": []
    }]
}