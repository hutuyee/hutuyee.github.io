# Q群绑 插件 Wiki

## Config.yml
```
ws: "ws://127.0.0.1:3001" #正向ws
踢出玩家: |
  您已被踢出服务器。
  请联系管理员了解详情。
  谢谢！
权限:
  总开关: true #这个开了的话就会记录玩家第一次加入 关了以下都会关
  指令开关: true
  指令: #仅支持%player_name%和%player_uuid% 待更新
    - "xp 99 %player_name%"
    - "give %player_name% minecraft:diamond 1"
QQ:
  菜单: |
    绑定 <ID>
    删除ID <ID>
    删除QQ <QQ>
  QQ绑定提示: "ID绑定成功"
  QQ重复: "您的QQ已在白名单中，如ID错误，请联系管理员进行处理"
  ID重复: "您的ID已在白名单中！"
  删除QQ不存在: "该QQ不存在"
  删除QQ提示: "该QQ已被删除"
  删除ID不存在: "该ID不存在"
  删除ID提示: "该ID已被删除"
  主人: "2139145308"
  不是主人: "你不是管理员"
  指令: "成功"
点券:
  增加: "增加 玩家 %player_name% 获得点券\n %获取点券% %获取前点券数% %获取后点券数%"
  减少: " 减少玩家 %player_name% 获得点券 %获取点券% %获取前点券数% %获取后点券数%"
  设置: "设置玩家 %player_name% 获得点券 %获取点券% %获取前点券数% %获取后点券数%"
Vault:
  增加: "增加玩家 %player_name% 获得Vault %获取Vault% %获取前Vault% %获取后Vault%"
  减少: "减少玩家 %player_name% 获得Vault %获取Vault% %获取前Vault% %获取后Vault%"
  设置: "设置玩家 %player_name% 获得Vault %获取Vault% %获取前Vault% %获取后Vault%"
```

在权限方法中 仅支持两个变量 %player_name% 和 %player_uuid%
在点券及Vault中 仅支持以下变量
- %player_name%  --- 玩家名
- %获取点券% / %获取Vault% ---输入命令后玩家可获得的数量
```例
增加点券 H_aaa 1
```
玩家H_aaa获得1点券 %获取点券% 为1
- %获取前点券% %获取前Vault%  在输入之前的数量
- %获取后点券% %获取后Vault%  在输入后的数量

如果要换行 您可以增加 "\n" 来进行换行
