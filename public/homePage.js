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
ratesBoard.getRatesBoard = (
  ApiConnector.getStocks(callback => {
    if (callback.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(callback.data);
    };
  })
);

ratesBoard.getRatesBoard = setTimeout(function () {
  ratesBoard.getRatesBoard = setTimeout(60000);
}, 0);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Баланс успешно пополнен.");
    } else {
      moneyManager.setMessage(callback.success, "Не выбрана валюта или сумма пополнения ⩽ 0.");
    };
  });
};
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Валюта сконвертирована.");
    } else {
      moneyManager.setMessage(callback.success, "Не выбраны разные валюты или сумма конвертации < 0.");
    };
  });
};
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (callback) => {
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage(callback.success, "Средства переданы.");
    } else {
      moneyManager.setMessage(callback.success, "Средства не переданы");
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
      favoritesWidget.setMessage(callback.success, "Введите ID и имя добавляемого пользователя.");
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
      favoritesWidget.setMessage(callback.success, "Ошибка удаления. Обратитесь в ТП.");
    };
  })
);