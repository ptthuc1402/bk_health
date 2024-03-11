<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <div>
      <div class="p-4 mt-[-100px]">
        <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <div>
              <h2 class="font-semibold text-xl text-gray-600">ĐĂNG KÝ KHÁM</h2>
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600">
                    <p class="font-medium text-lg">THÔNG TIN CÁ NHÂN</p>
                    <p>
                      Vui lòng điền thông tin vào biểu mẫu bên dưới để đăng ký khám bệnh theo yêu
                      cầu.
                    </p>
                  </div>
                  <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-5">
                        <label for="full_name">Họ và tên</label>
                        <input
                          type="text"
                          v-model="patient.name"
                          name="full_name"
                          id="full_name"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div class="md:col-span-5">
                        <label for="email">Địa chỉ email</label>
                        <input
                          type="text"
                          v-model="patient.email"
                          name="email"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="birthday">Ngày sinh</label>
                        <input
                          type="date"
                          v-model="patient.birth"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="phone">Số điện thoại</label>
                        <input
                          type="text"
                          v-model="patient.phone"
                          name="phone"
                          id="phone"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div class="md:col-span-5">
                        <label for="address">Địa chỉ</label>
                        <input
                          type="text"
                          v-model="patient.address"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div class="md:col-span-5">
                        <label for="sex">Giới tính</label>
                        <select
                          type="text"
                          v-model="patient.sex"
                          name="sex"
                          id="sex"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        >
                          <option>Giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>

                      <div class="md:col-span-5">
                        <label for="specific">Chuyên khoa</label>
                        <select
                          type="text"
                          v-model="patient.spec"
                          name="specific"
                          id="specific"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        >
                          <option value="">Chuyên khoa</option>
                          <option value="test">Xét Nghiệm</option>
                          <option value="pediatrics">Nhi khoa</option>
                          <option value="obstetric">Sản Phụ khoa</option>
                          <option value="mbj">Cơ - xương - khớp</option>
                          <option value="surgery">Khoa Ngoại</option>
                          <option value="ent">Tai Mũi Họng</option>
                          <option value="heart">Tim mạch</option>
                          <option value="hd">Tiêu Hóa Gan Mật</option>
                          <option value="medical">Nội tổng quát</option>
                          <option value="eyes">Mắt</option>
                          <option value="dento">Răng - Hàm - Mặt</option>
                          <option value="neuro">Nội Thần Kinh</option>
                          <option value="mind">Tâm Thể</option>
                          <option value="endocrine">Nội Tiết</option>
                          <option value="allergy">Dị ứng miễn dịch</option>
                          <option value="respiratory">Hô Hấp</option>
                          <option value="sleepy">Tư vấn giấc ngủ</option>
                          <option value="general">Khám sức khỏe tổng quát</option>
                          <option value="covid19">Khám sức khỏe hậu Covid-19</option>
                          <option value="skin">Da Liễu</option>
                        </select>
                      </div>

                      <div class="md:col-span-3">
                        <label for="date">Ngày khám</label>
                        <input
                          type="date"
                          v-model="patient.date"
                          id="chosen-date"
                          name="chosen-date"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="time">Buổi khám</label>
                        <select
                          type="text"
                          v-model="patient.time"
                          name="time"
                          id="time"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value=""
                          placeholder=""
                        >
                          <option value=""></option>
                          <option value="morning">Buổi sáng</option>
                          <option value="noon">Buổi trưa</option>
                          <option value="afternoon">Buổi chiều</option>
                        </select>
                      </div>

                      <div class="md:col-span-5">
                        <label for="syms">Triệu chứng</label>
                        <textarea
                          type="text"
                          v-model="patient.sym"
                          name="sym"
                          rows="5"
                          class="h-20 border mt-1 rounded px-2 w-full bg-gray-50"
                        ></textarea>
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end">
                          <button
                            @click="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isToast"
      id="toast-success"
      class="flex items-center w-full max-w-xs p-4 mt-[-130px] float-right text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Tạo buổi hẹn thành công</div>
    </div>
  </DefaultLayout>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      patient: {
        name: '',
        email: '',
        birth: '',
        phone: '',
        address: '',
        sex: '',
        spec: '',
        date: '',
        time: '',
        sym: ''
      },
      isToast: false
    }
  },
  methods: {
    submit(e) {
      axios
        .post('http://localhost:8080/appoint/store', {
          name: this.patient.name,
          email: this.patient.email,
          birth: this.patient.birth,
          phone: this.patient.phone,
          address: this.patient.address,
          sex: this.patient.sex,
          spec: this.patient.spec,
          date: this.patient.date,
          time: this.patient.time,
          sym: this.patient.sym
        })
        .then((response) => [])
      this.isToast = true
      setTimeout(() => {
        this.isToast = false
      }, '5000')
    }
  }
}
</script>
