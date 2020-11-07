"use strict"

const exit = new LogoutButton();
exit.action = () => {
  ApiConnector.logout((callback) => {
    if (callback.success);
      location.reload();
  });
};

ApiConnector.current((callback) => {
  if (callback.success);
  ProfileWidget.showProfile(callback.data);
});

const ratesBoard = new RatesBoard();
ratesBoard.getStocks = (function () {}); {
  ApiConnector.getStocks(callback => {
    if (callback.success); 
    ratesBoard.clearTable();
    ratesBoard.fillTable(callback.data);
  });
};

// const ratesBoard = new RatesBoard();
// ratesBoard.getStocks = () => {
//   ApiConnector.getStocks(callback => {
//     if (callback.success) 
//     ratesBoard.clearTable();
//     ratesBoard.fillTable(callback.data);
//   });
// };

ratesBoard.getStocks = setTimeout(function () {
  ratesBoard.getStocks = setTimeout(60000);
}, 0);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен.");
    } else {
      moneyManager.setMessage(false, "Не выбрана валюта или сумма пополнения ⩽ 0.");
    };
  });
};
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(true, "Валюта сконвертирована.");
    } else {
      moneyManager.setMessage(false, "Не выбраны разные валюты или сумма конвертации < 0.");
    };
  });
};
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(true, "Средства переданы.");
    } else {
      moneyManager.setMessage(false, "Средства не переданы");
    };
  });
};

const favoritesWidget = new FavoritesWidget();
favoritesWidget.getFavorites = (function () {}); {
  ApiConnector.getFavorites(callback => {
    if (callback.success); 
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    moneyManager.updateUsersList(callback.data);
  });
};