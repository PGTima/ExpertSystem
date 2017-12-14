;������� ������� �������
(deffunction ask-question (?question $?allowed-values)
   (printout t ?question)
   (bind ?answer (read))
   (if (lexemep ?answer) 
       then (bind ?answer (lowcase ?answer)))
   (while (not (member ?answer ?allowed-values)) do
      (printout t ?question)
      (bind ?answer (read))
      (if (lexemep ?answer) 
          then (bind ?answer (lowcase ?answer))))
   ?answer)
; �������������� 
(deffunction yes-or-no-p (?question)
   (bind ?response (ask-question ?question yes no y n))
   (if (or (eq ?response yes) (eq ?response y))
       then TRUE 
       else FALSE))
;��������� ��������
(defrule health-state ""
   (not (health-state complaint ?))
   (not (repair ?))
   =>
   (if (yes-or-no-p "� ��� ���� ������ �� �������� (yes/no)? ") 
    then 	(assert (health-state disease))                 
   else (assert (repair "�� �������!!!�������� ��� ���"))))
;��������� ������
(defrule disease-state-head ""
   (health-state disease)
   (not ( disease-state-head?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ���  ����� ������ (yes/no)? ")
       then	(assert (disease-state headache yes))                     
    else (assert (disease-state headache no)) 
  ))
  ;������
  (defrule disease-state-pain""
   (health-state disease)
   (disease-state headache no)
   (not ( disease-state-pain?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ���  ����� ����� (yes/no)? ")
       then	(assert (disease-state pain yes))                     
    else (assert (disease-state pain no)) 
  ))
  ;��������� ������
  (defrule disease-state-heart""
   (health-state disease)
   (disease-state headache no)
   (disease-state pain no)
   (not ( disease-state-heart?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ���� � ������� ������ (yes/no)? ")
       then	(assert (disease-state heart yes))                     
    else (assert (disease-state heart no)) 
  ))
;Head
(defrule disease-state-head-temperature ""
   (disease-state headache yes)
   (not ( disease-state-head-temperature?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ������� ����������� (yes/no)? ")
       then	(assert (head-state temperature yes))                     
    else (assert (head-state temperature no)) 
  ))
  (defrule disease-state-head-sneezing ""
   (disease-state headache yes)
   (head-state temperature no)
   (not ( disease-state-head-sneezing?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "�� ������� (yes/no)? ")
       then	(assert (head-state sneezing yes))                     
    else (assert (head-state sneezing no)) 
  ))
  (defrule disease-state-head-throat ""
   (disease-state headache yes)
   (head-state temperature yes)
   (not ( disease-state-head-throat?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ������������ ���� ��� ���� � ����� (yes/no)? ")
       then	(assert (head-state throat yes))                     
    else (assert (head-state throat no)) 
  ))

(defrule head-state-help-temperature ""
   (head-state throat yes)
   (not (repair ?))
   =>
   (if  (yes-or-no-p "� ��� ����������� ���� 39 �������� (yes/no)? ")
      then (assert (repair "�� ���� ����������� � ��� �����. ���������� ���������� � ��������!!! "))
      else (assert (repair "�� ���� ����������� � ��� ����. ���������� ���������� � ��������!!! "))))

(defrule head-state-turbulent ""
(declare (salience 15))
(head-state sneezing yes)
   (not (repair ?))
   =>
   (if  (yes-or-no-p "���� ������� ����� �����������? (yes/no)? ")
      then (assert (repair "�� ���� ����������� � ��� ����. ���������� ���������� � ��������!!! "))
    else  (assert (repair "�� ������������!!!����������� ���� ��� � ����� � �������, � ��� �� ����� ������� ����������.������ �������!!!"))))
(defrule head-state-sneezing ""
(declare (salience 10))
(head-state sneezing yes)
   (not (repair ?))
   =>
   (if  (yes-or-no-p "�������� �� ��������� �������� �� �����(2-3 ���) (yes/no)? ")
    then (assert (repair "�� ������������!!!����������� ���� ��� � ����� � �������, � ��� �� ����� ������� ����������.������ �������!!!"))))
;End HEAD
(defrule disease-state-pain-sharp ""
   (disease-state pain yes)
   (not ( disease-state-pain-sharp?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "����� � ��� ���� � ������ ������ (yes/no)? ")
       then	(assert (pain-state sharp yes))                     
    else
      (if (yes-or-no-p "����� � ��� ���� � ������ ������ (yes/no)? ")
      then	(assert (pain-state acute yes))
      else  (assert (pain-state unknow)) )
  ))
(defrule disease-state-pain-help1 ""
   (pain-state acute yes)
   (not ( disease-state-pain-help?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ������ (yes/no)? ")
       then	(assert (repair "� ��� �� ���� ����������� ���� !!!���������� ������ ���������� � �����!!!"))                     
    else (assert (repair "� ��� �� ���� ��������� ���������� !!!���������� ������ ���������� � �����!!!"))     
  ))
  (defrule disease-state-pain-help ""
   (pain-state sharp yes)
   (not ( disease-state-pain-help?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ������ (yes/no)? ")
       then	(assert (repair "� ��� �� ���� ����������� ���������� ���� ��������� �������� ��� ����������!!!������� �������������� ����!!!"))                          
  ))
;End pain

  ;��������� heart
  (defrule disease-state-heart-arterial-pressure ""
   (disease-state heart yes)
   (not ( disease-state-heart?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� �������� ���� 140 (yes/no)? ")
       then	(assert (heart-arterial-pressure yes))                     
    else (assert (heart-arterial-pressure no)) 
  ))
 (defrule disease-state-heart-arterial-pressure-high ""
  (heart-arterial-pressure yes)
   (not ( disease-state-heart-arterial-pressure-high?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ����������� ���� (yes/no)? ")
       then	(assert (heart-eyes  yes))                     
    else (assert (heart-eyes  no)) 
  ))
 (defrule disease-state-heart-weakness ""
  (heart-arterial-pressure no)
   (not ( disease-state-heart-weakness?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� �������� � ���� (yes/no)? ")
       then	(assert (heart-weakness  yes))                     
    else (assert (heart-weakness  no)) 
  ))
   (defrule disease-state-heart-dizziness ""
  (heart-weakness  yes)
   (not ( disease-state-heart-dizziness?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ���� ����� ��� �������������� (yes/no)? ")
       then	(assert (heart-dizziness  yes))                     
    else (assert (heart-dizziness  no)) 
  ))
(defrule disease-state-heart-help ""
  (heart-weakness  yes)
  (heart-dizziness  yes)
   (not ( disease-state-heart-help?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ������ ��� (yes/no)? ")
       then	(assert (repair "� ��� �� ���� ����������� �������� � �������!!!������� �������� ���, �����������, �������� �� �������!!!����� ��������� ���������� � ����������"))                      
  ))
  (defrule disease-state-heart-help1 ""
  (heart-eyes  yes)
   (not ( disease-state-heart-help1?))
   (not (repair ?))   
   =>
   (if (yes-or-no-p "� ��� ������ ��� (yes/no)? ")
       then	(assert (repair "� ��� �� ���� ����������� �������� � �������!!!������� �������� ���, �����������, �������� �� �������!!!����� ��������� ���������� � ����������"))                      
  ))
;Enters
  (defrule no-repairs ""
  (declare (salience -10))
  (not (repair ?))
  =>
  (assert (repair "� ��������� �� �� ������ ���������� ��� �� ������, ���������� ���������� � ��������!!!")))
  (defrule print-repair ""
  (declare (salience 10))
  (repair ?item)
  =>
  (printout t crlf crlf)
  (printout t "������������ �� �������:")
  (printout t crlf crlf)
  (format t " %s%n%n%n" ?item))
(defrule system-banner ""
  (declare (salience 10))
  =>
  (printout t crlf crlf)
  (printout t "������� Health Help")
  (printout t crlf crlf)
)