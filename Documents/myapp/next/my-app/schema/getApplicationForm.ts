import { gql } from "@apollo/client";

export default gql`
  query getApplicationFormQuery {
    getApplicationForm(idCardNo: "1539900565821") {
      id
      idCardNo
      prefixTitle {
        id
        nameThai
        nameEng
      }
      firstnameThai
      lastnameThai
      firstnameEng
      lastnameEng
      nickname
      gender
      birthdate
      nationality
      race
      religion
      age
      height
      weight
      scar
      bloodGroup
      placeOfBirth
      email
      lineId
      homeTelephone
      officeTelephone
      idCardIssuedAt
      idCardIssuedDate
      idCardExpiredDate
      idCardTaxId
      militaryService
      livingStatus
      marital
      marriedType
      spouseIncome
      spouseName
      spouseOccupation
      spouseFirmAddress
      childrenMale
      childrenFemale
      childrenInSchool
      childrenOver
      salaryStart
      salaryTo

      fatherName
      fatherAge
      fatherOccupation
      fatherStatus
      motherName
      motherAge
      motherOccupation
      motherStatus

      siblingTotal
      siblingMale
      siblingFemale
      siblingNo

      guarantor
      workShift
      relativeFriend
      relationship
      startWork

      computerSkill

      criminalCase
      criminalSpecify
      contagious
      contagiousSpecify
      newsChannel
      channelSpecify
    }
  }
`;
