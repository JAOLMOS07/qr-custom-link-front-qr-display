#!/bin/bash

# Replace placeholders in environment.dev.ts
if sed -i "s#<dev_api_content_url>#${DEV_API_CONTENT_URL}#g" ./src/environments/environment.dev.ts &&
   sed -i "s#<dev_front_link_apps_url>#${DEV_FRONT_LINK_APPS_URL}#g" ./src/environments/environment.dev.ts &&
   sed -i "s#<dev_api_order_url>#${DEV_API_ORDER_URL}#g" ./src/environments/environment.dev.ts; then
  echo "Replacement in environment.dev.ts succeeded"
else
  echo "Replacement in environment.dev.ts failed"
fi

# Replace placeholders in environment.uat.ts
if sed -i "s#<uat_api_content_url>#${UAT_API_CONTENT_URL}#g" ./src/environments/environment.uat.ts &&
   sed -i "s#<uat_front_link_apps_url>#${UAT_FRONT_LINK_APPS_URL}#g" ./src/environments/environment.uat.ts &&
   sed -i "s#<uat_api_order_url>#${UAT_API_ORDER_URL}#g" ./src/environments/environment.uat.ts; then
  echo "Replacement in environment.uat.ts succeeded"
else
  echo "Replacement in environment.uat.ts failed"
fi

# # Replace placeholders in environment.uat.ts
# if sed -i "s#<prod_api_content_url>#${PROD_API_CONTENT_URL}#g" ./src/environments/environment.prod.ts &&
#    sed -i "s#<prod_front_link_apps_url>#${PROD_FRONT_LINK_APPS_URL}#g" ./src/environments/environment.prod.ts &&
#    sed -i "s#<prod_api_order_url>#${PROD_API_ORDER_URL}#g" ./src/environments/environment.prod.ts; then
#   echo "Replacement in environment.prod.ts succeeded"
# else
#   echo "Replacement in environment.prod.ts failed"
# fi