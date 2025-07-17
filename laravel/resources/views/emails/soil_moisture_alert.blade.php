@component('mail::message')
# 土壌水分量アラート

以下の測定値がしきい値を下回りました。

- 測定日時：{{ $soilMoisture->measured_at }}
- 土壌水分量：{{ $soilMoisture->moisture }}
- カラカラID：{{ $soilMoisture->karakara_id }}

ご確認をお願いいたします。

@endcomponent