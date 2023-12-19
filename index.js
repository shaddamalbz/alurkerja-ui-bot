const express = require('express');
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
const OpenAI = require('openai')

// Inisialisasi bot Telegram
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI();

// This informs the Telegram servers of the new webhook.
bot.setWebHook(process.env.GITHUB_WEBHOOK_URL)

const app = express();
const port = 3000;

app.use(express.json());

async function generateExplanation(changedFiles) {

  const prompt = `Berikut adalah perubahan yang terdeteksi:\n${changedFiles.join('\n')}\n\nJelaskan perubahan tersebut:`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
   
    console.log(completion)
    // return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Gagal menghasilkan penjelasan dari ChatGPT:', error.message);
    return 'Gagal menghasilkan penjelasan.';
  }
}

app.get('/api/data', (req ,res) => {
  res.status(200).json({
    "data": {
      "show_as_menu": true,
      "name": "takwim",
      "is_bpmn": false,
      "is_usertask": false,
      "can_bulk": false,
      "can_create": true,
      "can_delete": true,
      "can_edit": true,
      "can_detail": true,
      "label": "Takwim",
      "base_url": "https://kpm-sys.merapi.javan.id",
      "path": "/api/crud/takwim",
      "description": "Field Dari Takwim",
      "header_action": [
        {
          "label": "Tambah",
          "action_label": "Tambah Takwim",
          "method": "post",
          "form_type": "new_page",
          "path": "/api/crud/takwim",
          "icon": "plus",
          "type": "primary"
        }
      ],
      "field_action": [
        {
          "label": "Detail",
          "action_label": "Maklumat Takwim",
          "method": "get",
          "form_type": "modal",
          "path": "/api/crud/takwim/{id}",
          "icon": "eye",
          "type": "primary"
        },
        {
          "label": "Edit",
          "action_label": "Kemaskini Takwim",
          "method": "put",
          "form_type": "modal",
          "path": "/api/crud/takwim/{id}",
          "icon": "edit",
          "type": "primary"
        },
        {
          "label": "Hapus",
          "action_label": "Hapus Takwim",
          "method": "delete",
          "form_type": "confirm_modal",
          "confirm": {
            "title": "Hapus Data",
            "message": "Adakah anda pasti ingin memadam data ini?",
            "confirm_text": "Ya, Teruskan",
            "cancel_text": "Batal"
          },
          "path": "/api/crud/takwim/{id}",
          "icon": "trash",
          "type": "danger"
        }
      ],
      "languages": {
        "pagination_info": "Paparan {page} hingga {limit} daripada {total} jumlah data",
        "empty_data": "Tiada rekod untuk dipaparkan"
      },
      "fields": {
        "nama_program": {
          "name": "nama_program",
          "label": "Nama Program",
          "required": true,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "number",
          "form_field_type": "INPUT_FOREIGN-SELECT",
          "primary": false,
          "is_hidden_in_create": false,
          "is_hidden_in_edit": false,
          "is_hidden_in_list": false,
          "is_hidden_in_detail": false,
          "rules": ["required", "integer"],
          "format": "",
          "prefix": "",
          "suffix": "",
          "select_options": {
            "url": "/api/crud/program",
            "table": "program",
            "method": "GET",
            "option_key": "id",
            "option_label": "nama_program"
          },
          "table_value_mapping": {
            "name": "nama_program",
            "type": "belongsTo",
            "relation": "program",
            "value": "nama_program"
          },
          "order_columns": true,
          "list_order": 1,
          "create_order": 1,
          "edit_order": 1
        },
        "nama_aktiviti": {
          "name": "nama_aktiviti",
          "label": "Nama Aktiviti",
          "required": true,
          "searchable": true,
          "filterable": false,
          "sortable": true,
          "type": "text",
          "form_field_type": "INPUT_TEXT",
          "primary": false,
          "is_hidden_in_create": false,
          "is_hidden_in_edit": false,
          "is_hidden_in_list": false,
          "is_hidden_in_detail": false,
          "rules": ["required", "string", "max:255"],
          "format": "",
          "prefix": "",
          "suffix": "",
          "order_columns": true,
          "list_order": 2,
          "create_order": 2,
          "edit_order": 2
        },
        "tarikh_mula": {
          "name": "tarikh_mula",
          "label": "Tarikh Mula",
          "required": true,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "date",
          "form_field_type": "INPUT_DATE",
          "primary": false,
          "is_hidden_in_create": false,
          "is_hidden_in_edit": false,
          "is_hidden_in_list": false,
          "is_hidden_in_detail": false,
          "rules": ["required", "date_format:Y-m-d"],
          "format": "DD-MM-YYYY",
          "prefix": "",
          "suffix": "",
          "order_columns": true,
          "list_order": 3,
          "create_order": 3,
          "edit_order": 3
        },
        "tarikh_akhir": {
          "name": "tarikh_akhir",
          "label": "Tarikh Akhir",
          "required": true,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "date",
          "form_field_type": "INPUT_DATE",
          "primary": false,
          "is_hidden_in_create": false,
          "is_hidden_in_edit": false,
          "is_hidden_in_list": false,
          "is_hidden_in_detail": false,
          "rules": ["required", "date_format:Y-m-d"],
          "format": "DD-MM-YYYY",
          "prefix": "",
          "suffix": "",
          "order_columns": true,
          "list_order": 4,
          "create_order": 4,
          "edit_order": 4
        },
        "status": {
          "name": "status",
          "label": "Status",
          "required": true,
          "searchable": false,
          "filterable": true,
          "sortable": true,
          "type": "number",
          "form_field_type": "INPUT_SELECT",
          "primary": false,
          "is_hidden_in_create": false,
          "is_hidden_in_edit": false,
          "is_hidden_in_list": false,
          "is_hidden_in_detail": false,
          "rules": ["required", "integer"],
          "format": "",
          "prefix": "",
          "suffix": "",
          "select_options": {
            "options": [
              {
                "key": "0",
                "label": "Tidak Aktif"
              },
              {
                "key": "1",
                "label": "Aktif"
              }
            ],
            "option_key": "key",
            "type": "INPUT_SELECT",
            "option_label": "label"
          },
          "order_columns": true,
          "list_order": 5,
          "create_order": 5,
          "edit_order": 5
        },
        "id": {
          "name": "id",
          "label": "Id",
          "required": true,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "number",
          "form_field_type": "INPUT_NUMBER",
          "primary": false,
          "is_hidden_in_create": true,
          "is_hidden_in_edit": true,
          "is_hidden_in_list": true,
          "is_hidden_in_detail": true,
          "rules": ["required", "integer"],
          "format": "",
          "prefix": "",
          "suffix": "",
          "list_order": 6,
          "create_order": 6,
          "edit_order": 6
        },
        "created_at": {
          "name": "created_at",
          "label": "Created At",
          "required": false,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "datetime-local",
          "form_field_type": "INPUT_DATETIME-LOCAL",
          "primary": false,
          "is_hidden_in_create": true,
          "is_hidden_in_edit": true,
          "is_hidden_in_list": true,
          "is_hidden_in_detail": true,
          "rules": ["nullable", "date_format:Y-m-d H:i:s"],
          "format": "DD-MM-YYYY HH:mm:ss",
          "prefix": "",
          "suffix": "",
          "list_order": 7,
          "create_order": 7,
          "edit_order": 7
        },
        "updated_at": {
          "name": "updated_at",
          "label": "Updated At",
          "required": false,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "datetime-local",
          "form_field_type": "INPUT_DATETIME-LOCAL",
          "primary": false,
          "is_hidden_in_create": true,
          "is_hidden_in_edit": true,
          "is_hidden_in_list": true,
          "is_hidden_in_detail": true,
          "rules": ["nullable", "date_format:Y-m-d H:i:s"],
          "format": "DD-MM-YYYY HH:mm:ss",
          "prefix": "",
          "suffix": "",
          "list_order": 8,
          "create_order": 8,
          "edit_order": 8
        },
        "created_by": {
          "name": "created_by",
          "label": "Created By",
          "required": false,
          "searchable": false,
          "filterable": false,
          "sortable": true,
          "type": "number",
          "form_field_type": "INPUT_NUMBER",
          "primary": false,
          "is_hidden_in_create": true,
          "is_hidden_in_edit": true,
          "is_hidden_in_list": true,
          "is_hidden_in_detail": true,
          "rules": ["nullable", "integer"],
          "format": "",
          "prefix": "",
          "suffix": "",
          "list_order": 9,
          "create_order": 9,
          "edit_order": 9
        }
    }
    },
    status: 200, 
    message: "Berhasil mendapatkan spec"
  }
  )
})

app.get('/api/data/spec', (req, res) => {
  res.status(200).json({
    data:{

      "content": [
        {
          "rn": "1",
          "id": 141,
          "tarikh_mula": "2023-07-20 00:00:00",
          "tarikh_akhir": "2023-07-28 00:00:00",
          "nama_program": "5",
          "nama_aktiviti": "test",
          "status": "1",
          "created_at": "2023-07-21T09:32:14.000000Z",
          "updated_at": "2023-07-21T09:32:14.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "1",
            "label": "Aktif"
          },
          "program": {
            "id": 5,
            "tarikh_buka": "2023-06-29 00:00:00",
            "tarikh_tutup": "2023-06-30 00:00:00",
            "status": "0",
            "jenis_perkhidmatan": "2",
            "tawaran_program": "2",
            "created_at": "2023-05-19T00:54:13.000000Z",
            "updated_at": "2023-05-19T00:54:13.000000Z",
            "created_by": null,
            "nama_program": "Cuti Belajar Tanpa Gaji"
          }
        },
        {
          "rn": "2",
          "id": 2,
          "tarikh_mula": "2023-05-27 00:00:00",
          "tarikh_akhir": "2023-05-30 00:00:00",
          "nama_program": "2",
          "nama_aktiviti": "Hadiah Latihan Persekutuan",
          "status": "0",
          "created_at": "2023-05-19T02:10:21.000000Z",
          "updated_at": "2023-05-19T02:10:21.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "0",
            "label": "Tidak Aktif"
          },
          "program": {
            "id": 2,
            "tarikh_buka": "2023-08-17 00:00:00",
            "tarikh_tutup": "2023-08-11 00:00:00",
            "status": "0",
            "jenis_perkhidmatan": "1",
            "tawaran_program": "2",
            "created_at": "2023-05-17T22:48:15.000000Z",
            "updated_at": "2023-05-17T22:51:08.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa HLP1234"
          }
        },
        {
          "rn": "3",
          "id": 61,
          "tarikh_mula": "2023-06-18 00:00:00",
          "tarikh_akhir": "2023-06-13 00:00:00",
          "nama_program": "1",
          "nama_aktiviti": "Sankhya",
          "status": "1",
          "created_at": "2023-06-18T04:57:06.000000Z",
          "updated_at": "2023-06-18T04:57:06.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "1",
            "label": "Aktif"
          },
          "program": {
            "id": 1,
            "tarikh_buka": "2023-05-25 00:00:00",
            "tarikh_tutup": "2023-05-31 00:00:00",
            "status": "1",
            "jenis_perkhidmatan": "2",
            "tawaran_program": "2",
            "created_at": "2023-05-17T06:39:03.000000Z",
            "updated_at": "2023-07-09T08:28:20.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa Programs"
          }
        },
        {
          "rn": "4",
          "id": 62,
          "tarikh_mula": "2023-06-18 00:00:00",
          "tarikh_akhir": "2023-06-18 00:00:00",
          "nama_program": "1",
          "nama_aktiviti": "Sankhya",
          "status": "0",
          "created_at": "2023-06-18T05:08:23.000000Z",
          "updated_at": "2023-06-18T05:08:23.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "0",
            "label": "Tidak Aktif"
          },
          "program": {
            "id": 1,
            "tarikh_buka": "2023-05-25 00:00:00",
            "tarikh_tutup": "2023-05-31 00:00:00",
            "status": "1",
            "jenis_perkhidmatan": "2",
            "tawaran_program": "2",
            "created_at": "2023-05-17T06:39:03.000000Z",
            "updated_at": "2023-07-09T08:28:20.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa Programs"
          }
        },
        {
          "rn": "5",
          "id": 63,
          "tarikh_mula": "2023-06-12 00:00:00",
          "tarikh_akhir": "2023-06-21 00:00:00",
          "nama_program": "4",
          "nama_aktiviti": "Budi",
          "status": "0",
          "created_at": "2023-06-18T05:08:43.000000Z",
          "updated_at": "2023-06-18T05:08:43.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "0",
            "label": "Tidak Aktif"
          },
          "program": {
            "id": 4,
            "tarikh_buka": "2023-05-19 00:00:00",
            "tarikh_tutup": "2023-05-20 00:00:00",
            "status": "1",
            "jenis_perkhidmatan": "0",
            "tawaran_program": "2",
            "created_at": "2023-05-19T00:50:30.000000Z",
            "updated_at": "2023-05-19T00:51:03.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa ISMP"
          }
        },
        {
          "rn": "6",
          "id": 101,
          "tarikh_mula": "2023-07-09 00:00:00",
          "tarikh_akhir": "2023-07-09 00:00:00",
          "nama_program": "22",
          "nama_aktiviti": "asd",
          "status": "0",
          "created_at": "2023-07-09T07:45:33.000000Z",
          "updated_at": "2023-07-09T07:45:33.000000Z",
          "created_by": null,
          "status_selection": {
            "key": "0",
            "label": "Tidak Aktif"
          },
          "program": {
            "id": 22,
            "tarikh_buka": "2023-05-30 00:00:00",
            "tarikh_tutup": "2023-05-30 00:00:00",
            "status": "1",
            "jenis_perkhidmatan": "0",
            "tawaran_program": "1",
            "created_at": "2023-05-29T05:50:07.000000Z",
            "updated_at": "2023-05-29T05:50:07.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa Ijazah Sarjana Muda Pendidikan"
          }
        },
        {
          "rn": "7",
          "id": 121,
          "tarikh_mula": "1979-08-28 00:00:00",
          "tarikh_akhir": "1991-08-11 00:00:00",
          "nama_program": "1",
          "nama_aktiviti": "Georgiana Steuber Sr.",
          "status": "5",
          "created_at": "2023-07-12T01:13:49.000000Z",
          "updated_at": "2023-07-12T01:13:49.000000Z",
          "created_by": null,
          "status_selection": null,
          "program": {
            "id": 1,
            "tarikh_buka": "2023-05-25 00:00:00",
            "tarikh_tutup": "2023-05-31 00:00:00",
            "status": "1",
            "jenis_perkhidmatan": "2",
            "tawaran_program": "2",
            "created_at": "2023-05-17T06:39:03.000000Z",
            "updated_at": "2023-07-09T08:28:20.000000Z",
            "created_by": null,
            "nama_program": "Biasiswa Programs"
          }
        }
      ]
    },
    status: 200,
    message: 'Berhasil mendapatkan data'
  }
  )
})

app.post('/github-webhook', (req, res) => {
  const payload = req.body;

  fs.readFile('package.json','utf-8', async(err, data) => {
    if (err) {
      console.error('Error reading package.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const packageJson = JSON.parse(data);
      const version = packageJson.version;

      bot.processUpdate(payload)

      if(payload?.commits && payload?.commits.length > 0) {
        console.log('getting changes...')
        const changedFiles = payload.commits.reduce((acc, commit) => {
          acc.push(...commit.added, ...commit.modified, ...commit.removed);
          return acc;
        }, []);

        const uniqueChangedFiles = [...new Set(changedFiles)];

        console.log('getting explanation...')
        const explanation = await generateExplanation(uniqueChangedFiles);
        bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `[UPDATE] Alurkerja-ui v${version}\n${explanation}`);
        res.status(200).send('Webhook received successfully.');
      }
    
    } catch (error) {
      console.error('Error parsing package.json:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
});

bot.onText(/\/version/, async(msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot Version 1.0');
});


app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

module.exports = app

