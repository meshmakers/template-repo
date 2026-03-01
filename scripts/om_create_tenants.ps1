# Create tenant for CustomApp
octo-cli -c Create -tid custom-app -db custom-app
octo-cli -c EnableCommunication
octo-cli -c EnableStreamdata
