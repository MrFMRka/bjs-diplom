"use strict"

const exit = new LogoutButton();
exit.action = () => {
  ApiConnector.logout((callback) => {
    if (callback.success)
      location.reload();
  });
};

ApiConnector.current((callback) => {
  if (callback.success)
  ProfileWidget.showProfile(callback.data);
});

const ratesBoard = new RatesBoard();
ratesBoard.getRatesBoard = () => {
  ApiConnector.getStocks((callback) => {
    if (callback.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(callback.data);
    }
  });
};

ratesBoard.getRatesBoard();
setTimeout(ratesBoard.getRatesBoard,60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Баланс успешно пополнен.");
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    };
  });
};
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Валюта сконвертирована.");
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    };
  });
};
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Средства переданы.");
    } else {
      moneyManager.setMessage(callback.success, callback.error);
    };
  });
};

const favoritesWidget = new FavoritesWidget();
favoritesWidget.getFavorites = (
  ApiConnector.getFavorites(callback => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
    };
  })
);
favoritesWidget.addUserCallback = (data) => (
  ApiConnector.addUserToFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(callback.success, "Пользователь успешно добавлен."); 
    } else {
      favoritesWidget.setMessage(callback.success, callback.error);
    };
  })
);
favoritesWidget.removeUserCallback = (data) => (
  ApiConnector.removeUserFromFavorites(data, (callback) => {
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage(callback.success, "Пользователь успешно удален.");
    } else {
      favoritesWidget.setMessage(callback.success, callback.error);
    };
  })
);